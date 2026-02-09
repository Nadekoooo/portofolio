import type { ResearchPaper } from "@/types";

export const papers: ResearchPaper[] = [
  {
    id: "rp-001",
    title:
      "Efficient Subgraph Isomorphism Detection in Large-Scale Knowledge Graphs",
    authors: ["A. Rahman", "S. Patel", "M. Chen"],
    abstract:
      "Subgraph isomorphism remains a computationally challenging problem, particularly when applied to large-scale knowledge graphs with millions of nodes and edges. In this paper, we propose a novel pruning-based algorithm that leverages vertex degree sequences and neighborhood label frequency vectors to significantly reduce the candidate search space before applying a backtracking-based matching procedure. Our approach integrates a lightweight graph neural network encoder to produce structural embeddings that serve as an initial filtering step, discarding clearly non-matching candidates in constant time. We evaluate our method on five benchmark datasets, including Freebase, YAGO, and DBpedia subsets, demonstrating a 3.2× average speedup over the state-of-the-art VF3 algorithm while maintaining equivalent accuracy. We further analyze the trade-offs between preprocessing overhead and query-time performance, establishing practical guidelines for deployment in real-time knowledge graph querying systems.",
    venue: "IEEE International Conference on Data Engineering (ICDE)",
    year: 2025,
    pdfUrl: "/papers/dummy.pdf",
    featured: true,
  },
  {
    id: "rp-002",
    title:
      "Fairness-Aware Federated Learning: Mitigating Demographic Bias Across Heterogeneous Data Silos",
    authors: ["A. Rahman", "L. Gomez"],
    abstract:
      "Federated learning enables collaborative model training across decentralized data sources without sharing raw data, yet it introduces unique challenges in ensuring fairness across demographic groups when data distributions differ significantly between participants. This work presents FairFL-Agg, a novel aggregation strategy that incorporates demographic parity and equalized odds constraints directly into the federated averaging process. By augmenting each client's local objective with a fairness regularization term and introducing a server-side re-weighting mechanism based on group-level performance disparities, we achieve a Pareto-optimal balance between overall accuracy and fairness metrics. Extensive experiments on the Adult Income, COMPAS, and CelebA datasets across non-IID federation settings show that FairFL-Agg reduces the maximum demographic disparity by up to 47% compared to standard FedAvg, with less than 1.5% degradation in global accuracy. Our theoretical analysis provides convergence guarantees under mild assumptions on client heterogeneity.",
    venue: "ACM Conference on Fairness, Accountability, and Transparency (FAccT)",
    year: 2026,
    pdfUrl: "/papers/dummy.pdf",
    featured: true,
  },
  {
    id: "rp-003",
    title:
      "Cache-Oblivious B-Trees Revisited: Practical Improvements for Modern Memory Hierarchies",
    authors: ["A. Rahman", "J. Kim", "T. Nakamura"],
    abstract:
      "Cache-oblivious data structures promise optimal memory-transfer performance without explicit knowledge of cache parameters, yet their practical adoption has been limited due to high constant factors and implementation complexity. We revisit the cache-oblivious B-tree design with three targeted optimizations: a fractional-cascading augmentation for range queries, a SIMD-friendly node layout that improves branch-free key comparison throughput by 2.8×, and a lazy rebalancing scheme that amortizes structural maintenance costs over batches of insertions. Our implementation, libCOBTree, is benchmarked against STL map, Google's B-tree, and the original van Emde Boas layout on workloads derived from TPC-H and YCSB. Results on Intel Sapphire Rapids and Apple M3 architectures show that libCOBTree achieves 15–40% faster mixed read-write throughput compared to cache-aware alternatives, particularly under memory pressure when the working set exceeds L3 capacity.",
    venue: "ACM SIGMOD International Conference on Management of Data",
    year: 2025,
    pdfUrl: "/papers/dummy.pdf",
    featured: false,
  },
];
