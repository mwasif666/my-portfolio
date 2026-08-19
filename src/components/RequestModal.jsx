import { useEffect, useState } from 'react';
import { Logo, XIcon } from './Icons';
import PillButton from './PillButton';
import { useScroll } from '../contexts/ScrollContext';

// Project enquiry modal. Submission transport can be connected separately.
export default function RequestModal({ open, onClose }) {
  const { stopScroll, startScroll } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => { if (open) setMounted(true); }, [open]);

  useEffect(() => {
    if (!mounted) return;
    stopScroll();
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(r);
      document.removeEventListener('keydown', onKey);
      startScroll();
    };
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  // Exit, then unmount; reset the form ~300ms after it's gone.
  useEffect(() => {
    if (open || !mounted) return;
    setShown(false);
    const t = setTimeout(() => {
      setMounted(false);
      setTimeout(() => { setSuccess(false); setSending(false); }, 300);
    }, 450);
    return () => clearTimeout(t);
  }, [open, mounted]);

  if (!mounted) return null;

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSuccess(true); }, 700);
  };

  return (
    <div id="modal" role="dialog" aria-modal="true" className={shown ? 'in' : ''} onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><XIcon /></button>

        {!success ? (
          <div>
            <div className="modal-head">
              <span className="row"><span className="dot" />Start a project</span>
              <h2>Tell me about your idea.</h2>
            </div>
            <form className="modal-form" onSubmit={submit}>
              <label>
                <span className="cap">Name</span>
                <input type="text" name="name" required placeholder="Your name" />
              </label>
              <label>
                <span className="cap">Email</span>
                <input type="email" name="email" required placeholder="you@company.com" />
              </label>
              <label>
                <span className="cap">Project</span>
                <textarea name="project" rows="4" required placeholder="A few words about your project, timeline, and budget." />
              </label>
              <div className="modal-bottom">
                <span className="modal-note">Share the goal, timeline and budget you have in mind.</span>
                <PillButton variant="dark" arrow="up-right" type="submit">
                  {sending ? 'Sending…' : 'Send request'}
                </PillButton>
              </div>
            </form>
          </div>
        ) : (
          <div className="modal-success">
            <div className="badge"><Logo /></div>
            <h2>Thanks for the details</h2>
            <p>Your project brief is ready. I look forward to learning more about what you want to build.</p>
            <PillButton variant="dark" onClick={onClose}>Close</PillButton>
          </div>
        )}
      </div>
    </div>
  );
}
