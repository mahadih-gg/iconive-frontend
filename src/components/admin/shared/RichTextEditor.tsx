"use client";

import { useEffect, type ReactNode } from "react";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BoldIcon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  UnlinkIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  editorClassName?: string;
  id?: string;
  "aria-invalid"?: boolean;
}

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "size-8 rounded-none",
        active && "bg-accent text-accent-foreground",
      )}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Write something...",
  disabled,
  className,
  editorClassName,
  id,
  "aria-invalid": ariaInvalid,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
    ],
    content: value || "",
    editable: !disabled,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id: id ?? "",
        class: cn(
          "min-h-36 w-full px-3 py-2 text-sm outline-none",
          "prose prose-sm max-w-none dark:prose-invert",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
          "[&_a]:text-primary [&_a]:underline",
          "[&_h2]:mb-2 [&_h2]:mt-3 [&_h2]:text-base [&_h2]:font-semibold",
          "[&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-sm [&_h3]:font-semibold",
          "[&_p]:my-1",
          editorClassName,
        ),
        "aria-invalid": ariaInvalid ? "true" : undefined,
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor: current }) => {
      const html = current.getHTML();
      onChange(current.isEmpty ? "" : html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.isEmpty ? "" : editor.getHTML();
    if (value === current) return;
    editor.commands.setContent(value || "", { emitUpdate: false });
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  function setLink() {
    if (!editor) return;

    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previous ?? "https://");

    if (url === null) return;

    const trimmed = url.trim();
    if (!trimmed) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: trimmed })
      .run();
  }

  if (!editor) return null;

  return (
    <div
      className={cn(
        "overflow-hidden border border-border bg-background",
        ariaInvalid && "border-destructive",
        disabled && "opacity-50",
        className,
      )}
    >
      <div className="flex flex-wrap gap-1 border-b border-border bg-muted/40 p-1.5">
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          disabled={disabled}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2Icon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          disabled={disabled}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3Icon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListIcon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrderedIcon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          disabled={disabled}
          onClick={setLink}
        >
          <LinkIcon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Remove link"
          disabled={disabled || !editor.isActive("link")}
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <UnlinkIcon className="size-3.5" />
        </ToolbarButton>
      </div>

      <div className="relative">
        {editor.isEmpty ? (
          <p className="pointer-events-none absolute top-2 left-3 text-sm text-muted-foreground">
            {placeholder}
          </p>
        ) : null}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
