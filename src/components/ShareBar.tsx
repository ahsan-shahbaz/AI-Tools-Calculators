'use client';

import { useEffect, useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

interface ShareBarProps {
  title: string;
  /** Canonical, parameter-free URL used for the social share links. */
  url: string;
}

const NETWORKS = (url: string, text: string) => [
  { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}` },
  { label: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
  { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { label: 'Reddit', href: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}` },
  { label: 'Email', href: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}` },
];

export default function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  // Copies the live address so any values reflected in the URL (shareable results) travel with it.
  const copy = async () => {
    const link = window.location.href;
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const el = document.createElement('textarea');
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = () => {
    navigator.share({ title, url: window.location.href }).catch(() => undefined);
  };

  const text = `${title} - free calculator`;

  return (
    <section
      aria-label="Share this calculator"
      className="mt-12 rounded-2xl border p-4 sm:p-5"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>
            Found this useful? Share it.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            Sending the link keeps your inputs, so a friend sees the same numbers.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={copy} className="btn-primary !px-3.5 !py-2 !text-xs" aria-live="polite">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
            {copied ? 'Link copied' : 'Copy link'}
          </button>
          {canShare && (
            <button type="button" onClick={nativeShare} className="btn-secondary !px-3.5 !py-2 !text-xs">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          )}
          {NETWORKS(url, text).map((n) => (
            <a
              key={n.label}
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !px-3 !py-2 !text-xs"
            >
              {n.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
