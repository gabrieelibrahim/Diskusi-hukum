'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useRef } from 'react'
import {
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconList,
  IconListNumbers,
  IconQuote,
  IconLink,
  IconPhoto,
  IconHeading,
  IconMinus,
  IconCode,
  IconUpload,
} from '@tabler/icons-react'

interface Props {
  content: string
  onChange: (html: string) => void
}

export default function TiptapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
      Placeholder.configure({ placeholder: 'Mulai menulis artikel...' }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  const addLink = () => {
    const url = window.prompt('Masukkan URL:')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diizinkan.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file maksimal 10MB.')
      return
    }
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Upload gagal')
      }
      const json = await res.json()
      editor.chain().focus().setImage({ src: json.data.path }).run()
    } catch (err: any) {
      alert(err.message || 'Upload gagal')
    } finally {
      setUploading(false)
    }
  }

  const ToolBtn = ({ onClick, active, label, children }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`p-2 rounded-lg transition-colors ${
        active ? 'bg-[#1B2A4A] text-white' : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50">
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} label="Heading">
          <IconHeading size={18} />
        </ToolBtn>
        <span className="w-px h-6 bg-gray-200 mx-1" />
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} label="Bold">
          <IconBold size={18} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} label="Italic">
          <IconItalic size={18} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} label="Strikethrough">
          <IconStrikethrough size={18} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} label="Code">
          <IconCode size={18} />
        </ToolBtn>
        <span className="w-px h-6 bg-gray-200 mx-1" />
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} label="Bullet List">
          <IconList size={18} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} label="Ordered List">
          <IconListNumbers size={18} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} label="Quote">
          <IconQuote size={18} />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} label="Horizontal Rule">
          <IconMinus size={18} />
        </ToolBtn>
        <span className="w-px h-6 bg-gray-200 mx-1" />
        <ToolBtn onClick={addLink} active={editor.isActive('link')} label="Link">
          <IconLink size={18} />
        </ToolBtn>
        <ToolBtn onClick={() => fileInputRef.current?.click()} active={false} label={uploading ? 'Mengupload...' : 'Upload Gambar'}>
          {uploading ? <IconUpload size={18} /> : <IconPhoto size={18} />}
        </ToolBtn>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          disabled={uploading}
        />
      </div>

      {/* Editor content */}
      <div className="prose-custom">
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .ProseMirror {
          padding: 1.25rem;
          min-height: 320px;
          outline: none;
          font-family: 'Merriweather', Georgia, serif;
          font-size: 15px;
          line-height: 1.8;
          color: #1E1E1E;
        }
        .ProseMirror p { margin-bottom: 0.75rem; }
        .ProseMirror h2 {
          font-size: 1.5rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          color: #1B2A4A;
        }
        .ProseMirror h3 {
          font-size: 1.25rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .ProseMirror ul, .ProseMirror ol { padding-left: 1.5rem; margin-bottom: 0.75rem; }
        .ProseMirror li { margin-bottom: 0.25rem; }
        .ProseMirror blockquote {
          border-left: 3px solid #C9A84C; padding-left: 1rem; margin: 1rem 0;
          font-style: italic; color: #5A6577;
        }
        .ProseMirror a { color: #C9A84C; text-decoration: underline; }
        .ProseMirror img { max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; }
        .ProseMirror code {
          background: #F5F6FA; padding: 2px 6px; border-radius: 4px; font-size: 0.85em;
        }
        .ProseMirror pre {
          background: #1B2A4A; color: white; padding: 1rem; border-radius: 8px;
          font-size: 0.85em; overflow-x: auto; margin: 1rem 0;
        }
        .ProseMirror pre code { background: none; color: inherit; padding: 0; }
        .ProseMirror hr { margin: 1.5rem 0; border: none; border-top: 1px solid #E2E5EC; }
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd; content: attr(data-placeholder); float: left;
          height: 0; pointer-events: none;
        }
      `}</style>
    </div>
  )
}