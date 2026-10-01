from typing import List, Dict, Any, Optional
import math
import re

class HybridRetrievalEngine:
    """
    Implements Hybrid RAG combining:
    1. Vector Semantic Similarity (Cosine Simulation)
    2. BM25 Lexical Keyword Scoring
    3. Metadata Filtering (Location, Agency, Verification Status, Recency)
    4. Reranking (Cross-Encoder style score weighting)
    """
    def __init__(self):
        pass

    def _tokenize(self, text: str) -> List[str]:
        return re.findall(r'\w+', text.lower())

    def _bm25_score(self, query: str, doc_text: str, avg_doc_len: float = 40.0, k1: float = 1.5, b: float = 0.75) -> float:
        q_tokens = self._tokenize(query)
        d_tokens = self._tokenize(doc_text)
        if not d_tokens or not q_tokens:
            return 0.0

        doc_len = len(d_tokens)
        score = 0.0
        for token in q_tokens:
            freq = d_tokens.count(token)
            if freq > 0:
                # Term frequency scaling
                num = freq * (k1 + 1)
                denom = freq + k1 * (1 - b + b * (doc_len / avg_doc_len))
                score += num / denom
        return round(score, 4)

    def _vector_score(self, query: str, doc_text: str) -> float:
        q_tokens = set(self._tokenize(query))
        d_tokens = set(self._tokenize(doc_text))
        if not q_tokens or not d_tokens:
            return 0.0
        intersection = q_tokens.intersection(d_tokens)
        # Jaccard + token overlap simulation of embedding similarity
        similarity = len(intersection) / math.sqrt(len(q_tokens) * len(d_tokens))
        return round(min(1.0, similarity * 1.4), 4)

    def retrieve(
        self,
        query: str,
        documents: List[Dict[str, Any]],
        top_k: int = 5,
        rerank_k: int = 3,
        agency_filter: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        scored_docs = []

        for doc in documents:
            content = doc.get("content", "") + " " + doc.get("title", "")
            if agency_filter and agency_filter.lower() not in doc.get("agency", "").lower():
                continue

            bm25 = self._bm25_score(query, content)
            vec = self._vector_score(query, content)

            # Combined hybrid score (50% vector, 50% BM25 normalized)
            hybrid_score = round(0.5 * vec + 0.5 * min(1.0, bm25 / 3.0), 4)

            # Reranking score: boost by agency official status & recency
            recency = doc.get("recency_score", 0.8)
            is_official = 1.2 if "Official" in doc.get("verification_status", "") else 1.0

            rerank_score = round(hybrid_score * recency * is_official, 4)

            doc_copy = dict(doc)
            doc_copy["vector_score"] = vec
            doc_copy["bm25_score"] = bm25
            doc_copy["relevance_score"] = hybrid_score
            doc_copy["rerank_score"] = rerank_score
            scored_docs.append(doc_copy)

        # Sort by rerank_score descending
        scored_docs.sort(key=lambda x: x["rerank_score"], reverse=True)

        return scored_docs[:rerank_k]

hybrid_retriever = HybridRetrievalEngine()
