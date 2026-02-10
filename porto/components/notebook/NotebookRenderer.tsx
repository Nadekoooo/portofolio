"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Eye, EyeOff } from "lucide-react";

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

// CodeCell Component with Collapsible Source
interface CodeCellProps {
  cell: NotebookCell;
}

function CodeCell({ cell }: CodeCellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group my-4 rounded-lg border border-border bg-card overflow-hidden">
      {/* Header Bar (Always Visible) */}
      <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          In [{cell.execution_count !== null && cell.execution_count !== undefined ? cell.execution_count : " "}]
        </span>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
          aria-label={isOpen ? "Hide code" : "Show code"}
        >
          {isOpen ? (
            <>
              <EyeOff className="h-3.5 w-3.5" />
              <span>Hide Code</span>
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" />
              <span>Show Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Block (Collapsible) */}
      {isOpen && (
        <div className="relative overflow-hidden bg-muted/50">
          <div className="overflow-x-auto p-4">
            <SyntaxHighlighter
              language="python"
              useInlineStyles={false}
              codeTagProps={{
                className: "text-sm font-mono text-foreground bg-transparent",
              }}
              customStyle={{ background: "transparent", margin: 0, padding: 0 }}
              wrapLongLines={true}
              showLineNumbers={false}
            >
              {sourceToString(cell.source)}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      {/* Code Outputs (Always Visible) */}
      {cell.outputs && cell.outputs.length > 0 && (
        <div className="border-t border-border/50">
          {cell.outputs.map((output, outputIndex) => (
            <div key={outputIndex} className="bg-background/50">
              {/* Stream Output (stdout/stderr) */}
              {output.output_type === "stream" && (
                <div className="px-4 py-3">
                  <pre className="overflow-x-auto text-sm font-mono text-foreground">
                    {sourceToString(output.text || "")}
                  </pre>
                </div>
              )}

              {/* Execute Result / Display Data */}
              {(output.output_type === "execute_result" ||
                output.output_type === "display_data") && (
                <div className="px-4 py-3">
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
              )}

              {/* Error Output */}
              {output.output_type === "error" && (
                <div className="px-4 py-3">
                  <pre className="overflow-x-auto text-sm font-mono text-destructive">
                    {output.traceback?.join("\n") || `${output.ename}: ${output.evalue}`}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function NotebookRenderer({ data }: NotebookRendererProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {data.cells.map((cell, index) => (
        <div key={index} className="mb-6">
          {cell.cell_type === "markdown" && (
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  // 1. Override Headings with better spacing and hierarchy
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4 border-b pb-2" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3" {...props} />
                  ),
                  
                  // 2. Override Paragraphs for better readability
                  p: ({ node, ...props }) => (
                    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
                  ),
                  
                  // 3. Override Code (Inline vs Block)
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    // Inline Code (like `variable`)
                    if (inline || !match) {
                      return (
                        <code 
                          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground" 
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    // Block Code - standard styling
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },

                  // 4. Override Tables (Shadcn-style tables)
                  table: ({ node, ...props }) => (
                    <div className="my-6 w-full overflow-y-auto rounded-lg border">
                      <table className="w-full text-sm" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th 
                      className="border-b bg-muted/50 px-4 py-2 text-left font-medium [&[align=center]]:text-center [&[align=right]]:text-right" 
                      {...props} 
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td 
                      className="border-b px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right" 
                      {...props} 
                    />
                  ),
                  
                  // 5. Override Images (Responsive)
                  img: ({ node, ...props }) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      className="rounded-md border bg-muted" 
                      alt={props.alt || "Notebook Image"} 
                      {...props} 
                    />
                  ),

                  // 6. Override Lists for better spacing
                  ul: ({ node, ...props }) => (
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
                  ),

                  // 7. Override Blockquotes
                  blockquote: ({ node, ...props }) => (
                    <blockquote 
                      className="mt-6 border-l-2 pl-6 italic text-muted-foreground" 
                      {...props} 
                    />
                  ),
                }}
              >
                {sourceToString(cell.source)}
              </ReactMarkdown>
            </div>
          )}

          {cell.cell_type === "code" && <CodeCell cell={cell} />}

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
