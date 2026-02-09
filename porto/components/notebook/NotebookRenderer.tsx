"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// Notebook data types
interface NotebookOutput {
  output_type: "stream" | "display_data" | "execute_result" | "error";
  name?: string;
  text?: string | string[];
  data?: {
    "text/plain"?: string | string[];
    "text/html"?: string | string[];
    "image/png"?: string;
    "image/jpeg"?: string;
    "application/json"?: unknown;
  };
  ename?: string;
  evalue?: string;
  traceback?: string[];
}

interface NotebookCell {
  cell_type: "markdown" | "code" | "raw";
  source: string | string[];
  execution_count?: number | null;
  outputs?: NotebookOutput[];
  metadata?: Record<string, unknown>;
}

interface NotebookData {
  cells: NotebookCell[];
  metadata?: {
    kernelspec?: {
      display_name?: string;
      language?: string;
      name?: string;
    };
    language_info?: {
      name?: string;
      version?: string;
    };
  };
  nbformat?: number;
  nbformat_minor?: number;
}

interface NotebookRendererProps {
  data: NotebookData;
}

// Helper to convert source arrays to strings
function sourceToString(source: string | string[]): string {
  return Array.isArray(source) ? source.join("") : source;
}

export function NotebookRenderer({ data }: NotebookRendererProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {data.cells.map((cell, index) => (
        <div key={index} className="mb-6">
          {cell.cell_type === "markdown" && (
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {sourceToString(cell.source)}
              </ReactMarkdown>
            </div>
          )}

          {cell.cell_type === "code" && (
            <div className="rounded-lg border border-border/50 bg-muted/30 overflow-hidden">
              {/* Code Input */}
              <div className="flex">
                {/* Execution Count */}
                <div className="flex-shrink-0 w-16 bg-zinc-900/40 px-3 py-3 text-right">
                  <span className="text-xs font-mono text-muted-foreground">
                    {cell.execution_count !== null && cell.execution_count !== undefined
                      ? `[${cell.execution_count}]:`
                      : "[ ]:"}
                  </span>
                </div>

                {/* Code Block */}
                <div className="flex-1 overflow-x-auto">
                  <SyntaxHighlighter
                    language="python"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      background: "transparent",
                      fontSize: "0.875rem",
                    }}
                    wrapLongLines={true}
                    showLineNumbers={false}
                  >
                    {sourceToString(cell.source)}
                  </SyntaxHighlighter>
                </div>
              </div>

              {/* Code Outputs */}
              {cell.outputs && cell.outputs.length > 0 && (
                <div className="border-t border-border/50">
                  {cell.outputs.map((output, outputIndex) => (
                    <div key={outputIndex} className="bg-background/50">
                      {/* Stream Output (stdout/stderr) */}
                      {output.output_type === "stream" && (
                        <div className="flex">
                          <div className="w-16 flex-shrink-0" />
                          <pre className="flex-1 overflow-x-auto px-4 py-3 text-sm font-mono text-foreground">
                            {sourceToString(output.text || "")}
                          </pre>
                        </div>
                      )}

                      {/* Execute Result / Display Data */}
                      {(output.output_type === "execute_result" ||
                        output.output_type === "display_data") && (
                        <div className="flex">
                          <div className="w-16 flex-shrink-0" />
                          <div className="flex-1 px-4 py-3">
                            {/* Image Output (PNG/JPEG) */}
                            {output.data?.["image/png"] && (
                              <img
                                src={`data:image/png;base64,${output.data["image/png"]}`}
                                alt="Output visualization"
                                className="max-w-full rounded border border-border"
                              />
                            )}
                            {output.data?.["image/jpeg"] && (
                              <img
                                src={`data:image/jpeg;base64,${output.data["image/jpeg"]}`}
                                alt="Output visualization"
                                className="max-w-full rounded border border-border"
                              />
                            )}

                            {/* HTML Output */}
                            {output.data?.["text/html"] && !output.data["image/png"] && (
                              <div
                                className="overflow-x-auto text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: sourceToString(output.data["text/html"]),
                                }}
                              />
                            )}

                            {/* Plain Text Output */}
                            {output.data?.["text/plain"] &&
                              !output.data["image/png"] &&
                              !output.data["image/jpeg"] &&
                              !output.data["text/html"] && (
                                <pre className="overflow-x-auto text-sm font-mono text-foreground">
                                  {sourceToString(output.data["text/plain"])}
                                </pre>
                              )}
                          </div>
                        </div>
                      )}

                      {/* Error Output */}
                      {output.output_type === "error" && (
                        <div className="flex">
                          <div className="w-16 flex-shrink-0" />
                          <pre className="flex-1 overflow-x-auto px-4 py-3 text-sm font-mono text-destructive">
                            {output.traceback?.join("\n") || `${output.ename}: ${output.evalue}`}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {cell.cell_type === "raw" && (
            <pre className="overflow-x-auto rounded-lg border border-border/50 bg-muted/30 p-4 text-sm font-mono text-muted-foreground">
              {sourceToString(cell.source)}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
