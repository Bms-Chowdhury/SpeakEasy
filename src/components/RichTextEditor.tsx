import { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImagePlus,
  Link as LinkIcon,
  Undo,
  Redo,
  Highlighter,
  Loader2,
  Type,
} from "lucide-react";
import { uploadImageToStorage } from "../lib/supabase";

// ============================================================
// ToolbarButton COMPONENT (MOVED OUTSIDE - FIXED)
// ============================================================
interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
  ariaLabel: string;
}

const ToolbarButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
  ariaLabel,
}: ToolbarButtonProps) => (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    disabled={disabled}
    title={title}
    aria-label={ariaLabel}
    aria-pressed={isActive}
    aria-disabled={disabled}
    className={`p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
      isActive
        ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700"
        : ""
    }`}
  >
    {children}
  </button>
);

// ============================================================
// Divider COMPONENT (MOVED OUTSIDE - FIXED)
// ============================================================
const Divider = () => (
  <div className="w-px h-5 bg-slate-200 mx-1" aria-hidden="true" />
);

// ============================================================
// readFileAsBase64 FUNCTION (MOVED OUTSIDE - FIXED)
// ============================================================
const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// ============================================================
// FontSize EXTENSION (FULLY FIXED - NO 'any' TYPE)
// ============================================================
const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => {
              const fontSize = element.style.fontSize;
              return fontSize ? fontSize.replace("px", "") : null;
            },
            renderHTML: (attributes: { fontSize?: string }) => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize: size }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

// ============================================================
// MAIN COMPONENT
// ============================================================
interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  error?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  error,
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [fontSize, setFontSize] = useState<string>("16");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        blockquote: {},
        codeBlock: {},
        horizontalRule: {},
      }),
      TextStyle,
      FontSize,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-xl my-4",
        },
      }),
      Placeholder.configure({
        placeholder:
          "Write your content here... Use the toolbar to format text, add images, and more.",
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class:
            "text-indigo-600 underline hover:text-indigo-800 cursor-pointer",
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: false,
        HTMLAttributes: {
          class: "bg-yellow-200 dark:bg-yellow-800/50 rounded px-0.5",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate prose-sm max-w-none focus:outline-none min-h-[320px] px-4 py-3",
        "aria-label": "Rich text editor content",
        "aria-multiline": "true",
        role: "textbox",
      },
    },
  });

  const handleFontSizeChange = useCallback(
    (size: string) => {
      if (!editor) return;
      const sizeNum = parseInt(size, 10);
      if (sizeNum >= 1 && sizeNum <= 50) {
        editor.chain().focus().setFontSize(size).run();
        setFontSize(size);
      }
    },
    [editor],
  );

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!editor) return;
      setUploading(true);

      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
        const isConfigured =
          supabaseUrl.length > 0 && !supabaseUrl.includes("your-project");

        if (isConfigured) {
          const url = await uploadImageToStorage(file);
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          } else {
            const base64 = await readFileAsBase64(file);
            editor.chain().focus().setImage({ src: base64 }).run();
          }
        } else {
          const base64 = await readFileAsBase64(file);
          editor.chain().focus().setImage({ src: base64 }).run();
        }
      } catch (err) {
        console.error("Image upload failed:", err);
      } finally {
        setUploading(false);
      }
    },
    [editor],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file);
      }
      e.target.value = "";
    },
    [handleImageUpload],
  );

  const addImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const addLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const getActiveStateText = (
    isActive: boolean,
    actionName: string,
  ): string => {
    return isActive ? `${actionName} active` : `${actionName} inactive`;
  };

  return (
    <div className="w-full">
      <div
        className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border border-slate-200 rounded-t-xl bg-white border-b-0"
        role="toolbar"
        aria-label="Text formatting options"
      >
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
          ariaLabel="Undo last action"
        >
          <Undo size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
          ariaLabel="Redo last undone action"
        >
          <Redo size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
          ariaLabel={`Bold text. ${getActiveStateText(editor.isActive("bold"), "Bold")}`}
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
          ariaLabel={`Italic text. ${getActiveStateText(editor.isActive("italic"), "Italic")}`}
        >
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline (Ctrl+U)"
          ariaLabel={`Underline text. ${getActiveStateText(editor.isActive("underline"), "Underline")}`}
        >
          <UnderlineIcon size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strikethrough"
          ariaLabel={`Strikethrough text. ${getActiveStateText(editor.isActive("strike"), "Strikethrough")}`}
        >
          <Strikethrough size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
          title="Highlight text"
          ariaLabel={`Highlight text. ${getActiveStateText(editor.isActive("highlight"), "Highlight")}`}
        >
          <Highlighter size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          title="Inline code"
          ariaLabel={`Inline code formatting. ${getActiveStateText(editor.isActive("code"), "Code")}`}
        >
          <Code size={15} />
        </ToolbarButton>

        <Divider />

        {/* Font Size Control */}
        <div className="flex items-center gap-1 px-1">
          <Type size={15} className="text-slate-500" aria-hidden="true" />
          <label htmlFor="font-size-select" className="sr-only">
            Font size (1-50 pixels)
          </label>
          <input
            id="font-size-select"
            type="number"
            min="1"
            max="50"
            value={fontSize}
            onChange={(e) => handleFontSizeChange(e.target.value)}
            className="w-14 px-1 py-1 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Font size in pixels, from 1 to 50"
            title="Font size (1-50px)"
          />
          <span className="text-xs text-slate-500" aria-hidden="true">
            px
          </span>
        </div>

        <Divider />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
          ariaLabel={`Heading level 1. ${getActiveStateText(editor.isActive("heading", { level: 1 }), "Heading 1")}`}
        >
          <Heading1 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
          ariaLabel={`Heading level 2. ${getActiveStateText(editor.isActive("heading", { level: 2 }), "Heading 2")}`}
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
          ariaLabel={`Heading level 3. ${getActiveStateText(editor.isActive("heading", { level: 3 }), "Heading 3")}`}
        >
          <Heading3 size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet list"
          ariaLabel={`Bullet list. ${getActiveStateText(editor.isActive("bulletList"), "Bullet list")}`}
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered list"
          ariaLabel={`Numbered list. ${getActiveStateText(editor.isActive("orderedList"), "Numbered list")}`}
        >
          <ListOrdered size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Quote"
          ariaLabel={`Blockquote. ${getActiveStateText(editor.isActive("blockquote"), "Blockquote")}`}
        >
          <Quote size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal line"
          ariaLabel="Insert horizontal rule"
        >
          <Minus size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Align left"
          ariaLabel={`Align text left. ${getActiveStateText(editor.isActive({ textAlign: "left" }), "Left align")}`}
        >
          <AlignLeft size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Align center"
          ariaLabel={`Center align text. ${getActiveStateText(editor.isActive({ textAlign: "center" }), "Center align")}`}
        >
          <AlignCenter size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="Align right"
          ariaLabel={`Align text right. ${getActiveStateText(editor.isActive({ textAlign: "right" }), "Right align")}`}
        >
          <AlignRight size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive("link")}
          title="Add link (Ctrl+K)"
          ariaLabel={`Add or edit link. ${getActiveStateText(editor.isActive("link"), "Link")}`}
        >
          <LinkIcon size={15} />
        </ToolbarButton>

        <ToolbarButton
          onClick={addImage}
          disabled={uploading}
          title={uploading ? "Uploading image..." : "Upload image"}
          ariaLabel={
            uploading
              ? "Uploading image, please wait"
              : "Upload image from computer"
          }
        >
          {uploading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <ImagePlus size={15} />
          )}
        </ToolbarButton>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      <div
        className={`border rounded-b-xl overflow-hidden bg-slate-50 ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      >
        <EditorContent editor={editor} />
      </div>

      {error && (
        <p
          className="text-[11px] text-red-500 mt-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
