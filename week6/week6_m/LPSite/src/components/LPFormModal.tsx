import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLP, updateLP, uploadFile } from '../api/lp';
import type { LPDetail } from '../types';
import './LPFormModal.css';

interface LPFormModalProps {
  onClose: () => void;
  editTarget?: LPDetail;
}

export function LPFormModal({ onClose, editTarget }: LPFormModalProps) {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(editTarget?.title ?? '');
  const [content, setContent] = useState(editTarget?.content ?? '');
  const thumbnailUrl = editTarget?.thumbnail ?? '';
  const [thumbnailPreview, setThumbnailPreview] = useState(editTarget?.thumbnail ?? '');
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>(editTarget?.tags.map(t => t.name) ?? []);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');

  const isEdit = !!editTarget;

  const mutation = useMutation({
    mutationFn: async () => {
      let thumbnail = thumbnailUrl;

      if (pendingFile) {
        thumbnail = await uploadFile(pendingFile);
      }

      return isEdit
        ? updateLP(editTarget!.id, { title, content, thumbnail: thumbnail || undefined, tags, published: true })
        : createLP({ title, content, thumbnail: thumbnail || undefined, tags, published: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      if (isEdit) {
        queryClient.invalidateQueries({ queryKey: ['lp', editTarget!.id] });
      }
      onClose();
    },
    onError: (err: any) => {
      console.error('[LP error] response.data:', err?.response?.data);
      const msg = err?.response?.data?.message ?? err?.message ?? '알 수 없는 오류';
      setError(`${isEdit ? 'LP 수정' : 'LP 생성'} 실패: ${JSON.stringify(msg)}`);
    },
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags(prev => [...prev, t]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  return (
    <div className="lp-modal-backdrop" onClick={onClose}>
      <div className="lp-modal-box" onClick={e => e.stopPropagation()}>
        <div className="lp-modal-header">
          <h2>{isEdit ? 'LP 수정' : 'LP 추가'}</h2>
          <button className="lp-modal-close" onClick={onClose} aria-label="닫기">×</button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim()) return;
            if (!thumbnailPreview) { setError('사진을 선택해주세요.'); return; }
            setError('');
            mutation.mutate();
          }}
          className="lp-modal-form"
        >
          <div className="lp-form-field">
            <label>LP 사진</label>
            <div className="lp-file-drop" onClick={() => fileRef.current?.click()}>
              {thumbnailPreview
                ? <img src={thumbnailPreview} alt="미리보기" className="lp-file-preview" />
                : <span className="lp-file-placeholder">클릭하여 사진 선택</span>}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              style={{ display: 'none' }}
            />
          </div>

          <div className="lp-form-field">
            <label>제목 *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="LP 제목을 입력하세요"
              required
            />
          </div>

          <div className="lp-form-field">
            <label>내용</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="LP에 대한 설명을 입력하세요"
              rows={3}
            />
          </div>

          <div className="lp-form-field">
            <label>태그</label>
            <div className="lp-tag-row">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="태그 입력 후 + 클릭"
              />
              <button type="button" onClick={addTag} className="lp-tag-add">+</button>
            </div>
            {tags.length > 0 && (
              <div className="lp-tags-list">
                {tags.map(tag => (
                  <span key={tag} className="lp-tag-chip">
                    #{tag}
                    <button type="button" onClick={() => removeTag(tag)} aria-label="태그 삭제">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && <p className="lp-modal-error">{error}</p>}

          <button
            type="submit"
            className="lp-modal-submit"
            disabled={!title.trim() || !thumbnailPreview || mutation.isPending}
          >
            {mutation.isPending
              ? (pendingFile ? '업로드 중...' : (isEdit ? '저장 중...' : '추가 중...'))
              : (isEdit ? '저장' : 'Add LP')}
          </button>
        </form>
      </div>
    </div>
  );
}