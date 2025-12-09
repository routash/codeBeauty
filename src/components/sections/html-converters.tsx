"use client";

import { useState } from "react";
import {
  ReusableSidebar,
  SidebarContentWrapper,
  SidebarOption,
} from "@/components/ui/reusable-sidebar";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Settings,
  Palette,
  RefreshCw,
  Copy,
} from "lucide-react";

import { stripHTML } from "@/utils/utils";

export function HtmlConverters() {
  const [selectedConverter, setSelectedConverter] = useState("html-stripper");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const converterOptions: SidebarOption[] = [
    { id: "html-stripper", label: "HTML Stripper", icon: FileText, description: "Remove all HTML tags." },
    { id: "html-table-generator", label: "HTML Table Generator", icon: FileText, description: "Generate HTML table from CSV." },
    { id: "html-to-csv", label: "HTML to CSV Converter", icon: FileText, description: "Convert HTML table to CSV." },
    { id: "html-to-tsv", label: "HTML to TSV Converter", icon: FileText, description: "Convert HTML table to TSV." },
    { id: "html-to-php", label: "HTML to PHP Converter", icon: FileText, description: "Convert HTML to PHP echo." },
    { id: "html-to-json", label: "HTML to JSON", icon: FileText, description: "Convert HTML to JSON." },
    { id: "html-to-xml", label: "HTML to XML Converter", icon: FileText, description: "Convert HTML to XML." },
    { id: "html-to-yaml", label: "HTML to YAML Converter", icon: FileText, description: "Convert HTML to YAML." },
    { id: "html-to-text", label: "HTML to Text", icon: FileText, description: "Extract text from HTML." },
    { id: "text-to-html-entities", label: "Text → HTML Entities", icon: FileText, description: "Encode text to HTML entities." },
    { id: "html-entities-to-text", label: "HTML Entities → Text", icon: FileText, description: "Decode HTML entities." },
    { id: "html-to-markdown", label: "HTML to Markdown", icon: FileText, description: "Convert HTML to Markdown." },
    { id: "markdown-to-html", label: "Markdown to HTML", icon: FileText, description: "Convert Markdown to HTML." },
    { id: "pug-to-html", label: "PUG to HTML", icon: FileText, description: "Convert simple PUG to HTML." },
    { id: "html-to-pug", label: "HTML to PUG", icon: FileText, description: "Convert HTML to simple PUG." },
    { id: "jade-to-html", label: "JADE to HTML", icon: FileText, description: "Convert simple Jade to HTML." },
    { id: "html-to-jade", label: "HTML to JADE", icon: FileText, description: "Convert HTML to simple Jade." },
    { id: "html-to-bbcode", label: "HTML → BBCode", icon: FileText, description: "Convert HTML to BBCode." },
    { id: "bbcode-to-html", label: "BBCode → HTML", icon: FileText, description: "Convert BBCode to HTML." },
  ];

  const footerOptions = [{ id: "settings", label: "Settings", icon: Settings }];

  const selectedOption = converterOptions.find(
    (opt) => opt.id === selectedConverter
  );

  const handleConverterChange = (id: string) => {
    setSelectedConverter(id);
    setInput("");
    setOutput("");
  };

  // -------------------------------------------------------
  // ⭐ PURE JAVASCRIPT CONVERTERS (NO LIBS)
  // -------------------------------------------------------

  // HTML → CSV / TSV
  function extractTable(delimiter: string) {
    const rows = [...input.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) => r[1]);

    const data = rows
      .map((row) => {
        const cells = [...row.matchAll(/<t[dh]>([\s\S]*?)<\/t[dh]>/g)].map(
          (c) => stripHTML(c[1]).trim()
        );
        return cells.join(delimiter);
      })
      .join("\n");

    return data || "No table found";
  }

  // HTML → JSON
  function htmlToJSON() {
    return JSON.stringify({ html: input }, null, 2);
  }

  // HTML → XML (simple conversion)
  function htmlToXML() {
    return input
      .replace(/<br>/g, "<br/>")
      .replace(/&nbsp;/g, " ")
      .trim();
  }

  // HTML → YAML (basic)
  function htmlToYAML() {
    return `html: |\n  ${input.replace(/\n/g, "\n  ")}`;
  }

  // Text → HTML Entities
  function encodeEntities(text: string) {
    return text
      .split("")
      .map((char) => `&#${char.charCodeAt(0)};`)
      .join("");
  }

  // Entities → Text
  function decodeEntities(str: string) {
    return str.replace(/&#(\d+);/g, (_, n) =>
      String.fromCharCode(parseInt(n))
    );
  }

  // HTML → Markdown (simple)
  function htmlToMD() {
    return input
      .replace(/<b>(.*?)<\/b>/g, "**$1**")
      .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
      .replace(/<i>(.*?)<\/i>/g, "*$1*")
      .replace(/<u>(.*?)<\/u>/g, "__$1__")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<h1>(.*?)<\/h1>/g, "# $1\n")
      .replace(/<h2>(.*?)<\/h2>/g, "## $1\n")
      .replace(/<p>(.*?)<\/p>/g, "$1\n");
  }

  // Markdown → HTML (simple)
  function mdToHTML() {
    return input
      .replace(/^# (.*)$/gm, "<h1>$1</h1>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "<i>$1</i>")
      .replace(/__(.*?)__/g, "<u>$1</u>")
      .replace(/\n/g, "<br>");
  }

  // HTML → PUG (simple)
  function htmlToPug() {
    return input
      .replace(/<(\w+)>/g, "$1")
      .replace(/<\/\w+>/g, "")
      .replace(/>/g, "")
      .replace(/\n/g, "\n  ");
  }

  // PUG → HTML (basic)
  function pugToHTML(pug: string) {
    return pug
      .split("\n")
      .map((line) => {
        const tag = line.trim();
        if (!tag) return "";
        return `<${tag}></${tag}>`;
      })
      .join("\n");
  }

  // JADE → HTML (simple version)
  function jadeToHTML(jade: string) {
    return jade
      .split("\n")
      .map((line) => {
        const tag = line.trim();
        return `<${tag}></${tag}>`;
      })
      .join("\n");
  }

  // HTML → JADE (simple)
  function htmlToJade() {
    return input
      .replace(/<(\w+)[^>]*>/g, "$1")
      .replace(/<\/\w+>/g, "")
      .replace(/\n/g, "\n  ");
  }

  // HTML → BBCode
  function htmlToBB() {
    return input
      .replace(/<b>(.*?)<\/b>/g, "[b]$1[/b]")
      .replace(/<i>(.*?)<\/i>/g, "[i]$1[/i]")
      .replace(/<u>(.*?)<\/u>/g, "[u]$1[/u]");
  }

  // BBCode → HTML
  function bbToHTML() {
    return input
      .replace(/\[b\](.*?)\[\/b\]/g, "<b>$1</b>")
      .replace(/\[i\](.*?)\[\/i\]/g, "<i>$1</i>")
      .replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>");
  }

  // CSV → HTML Table
  function csvToHTML() {
    return `<table>\n${input
      .split("\n")
      .map(
        (row) =>
          `<tr>${row
            .split(",")
            .map((c) => `<td>${c.trim()}</td>`)
            .join("")}</tr>`
      )
      .join("\n")}\n</table>`;
  }

  // -------------------------------------------------------

  const handleConvert = () => {
    let result = "";

    switch (selectedConverter) {
      case "html-stripper":
      case "html-to-text":
        result = stripHTML(input);
        break;

      case "html-to-csv":
        result = extractTable(",");
        break;

      case "html-to-tsv":
        result = extractTable("\t");
        break;

      case "html-to-php":
        result = `<?php\necho <<<HTML\n${input}\nHTML;\n?>`;
        break;

      case "html-to-json":
        result = htmlToJSON();
        break;

      case "html-to-xml":
        result = htmlToXML();
        break;

      case "html-to-yaml":
        result = htmlToYAML();
        break;

      case "text-to-html-entities":
        result = encodeEntities(input);
        break;

      case "html-entities-to-text":
        result = decodeEntities(input);
        break;

      case "html-to-markdown":
        result = htmlToMD();
        break;

      case "markdown-to-html":
        result = mdToHTML();
        break;

      case "html-to-pug":
        result = htmlToPug();
        break;

      case "pug-to-html":
        result = pugToHTML(input);
        break;

      case "html-to-jade":
        result = htmlToJade();
        break;

      case "jade-to-html":
        result = jadeToHTML(input);
        break;

      case "html-to-bbcode":
        result = htmlToBB();
        break;

      case "bbcode-to-html":
        result = bbToHTML();
        break;

      case "html-table-generator":
        result = csvToHTML();
        break;

      default:
        result = "Not implemented.";
    }

    setOutput(result);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    alert("Copied!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ReusableSidebar
      title="HTML Converter Tools"
      icon={Palette}
      options={converterOptions}
      selectedOption={selectedConverter}
      onOptionSelect={handleConverterChange}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="mx-auto">
          <h2 className="text-2xl font-bold mb-2">{selectedOption?.label}</h2>
          <p className="text-muted-foreground mb-6">{selectedOption?.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-2 border-dashed rounded-lg p-3 h-[400px] w-full"
                placeholder="Paste input here..."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Output</label>
              <textarea
                readOnly
                value={output}
                className="border-2 border-dashed rounded-lg p-3 h-[400px] w-full"
                placeholder="Output appears here..."
              />
              {output && (
                <Button className="mt-3 flex gap-2" onClick={handleCopy}>
                  <Copy size={16} /> Copy
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button onClick={handleConvert}>
              <RefreshCw className="h-4 w-4 mr-2" /> Convert
            </Button>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  );
}
