import { useMemo, useState } from 'react';

const recommendedRegions = [
  { flag: '🇸🇬', country: 'Singapore', fee: '$0.01 USD' },
  { flag: '🇬🇧', country: 'United Kingdom', fee: '$0.01 USD' },
  { flag: '🇨🇭', country: 'Switzerland', fee: '$0.01 USD' },
  { flag: '🇯🇵', country: 'Japan', fee: '$0.01 USD' },
  { flag: '🇺🇸', country: 'United States', fee: '$0.20 USD', recommended: true },
  { flag: '🇩🇪', country: 'Germany', fee: '$0.01 USD' },
  { flag: '🇫🇷', country: 'France', fee: '$0.01 USD' },
];

const moreRegions = [
  { flag: '🇨🇦', country: 'Canada', fee: '$0.01 USD' },
  { flag: '🇳🇱', country: 'Netherlands', fee: '$0.01 USD' },
  { flag: '🇦🇺', country: 'Australia', fee: '$0.01 USD' },
  { flag: '🇸🇪', country: 'Sweden', fee: '$0.01 USD' },
  { flag: '🇳🇴', country: 'Norway', fee: '$0.01 USD' },
  { flag: '🇦🇹', country: 'Austria', fee: '$0.01 USD' },
  { flag: '🇮🇪', country: 'Ireland', fee: '$0.01 USD' },
  { flag: '🇩🇰', country: 'Denmark', fee: '$0.01 USD' },
];

const allRegions = [...recommendedRegions, ...moreRegions];

function RegionRow({ region, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(region)}
      className="group flex w-full items-center justify-between rounded-xl border border-transparent px-2 py-3 text-left transition duration-200 hover:border-[color:var(--border)] hover:bg-[color:var(--card)]"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl leading-none">{region.flag}</span>
        <div>
          <p className="text-base text-[color:var(--text)]">{region.country}</p>
          {region.recommended && (
            <span className="mt-1 inline-flex rounded-md bg-[color:var(--badge-good-bg)] px-2 py-0.5 text-xs text-[color:var(--badge-good-text)]">
              Recommended
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-right text-sm">
          <span className="font-semibold text-[color:var(--brand)]">{region.fee}</span>{' '}
          <span className="text-[color:var(--muted)]">Fee</span>
        </p>
        <span className="text-xl text-[color:var(--muted)] transition-transform duration-200 group-hover:translate-x-0.5">›</span>
      </div>
    </button>
  );
}

export default function App() {
  const [status, setStatus] = useState('idle');
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(false);

  const visibleRegions = useMemo(() => {
    const pool = expanded ? allRegions : recommendedRegions;
    return pool.filter((region) => region.country.toLowerCase().includes(query.toLowerCase()));
  }, [expanded, query]);

  const handleCheckRegion = () => {
    setStatus('loading');
    setTimeout(() => setStatus('detected'), 2000);
  };

  const confirmRegionChange = () => {
    setSelected(null);
    setToast(true);
    setTimeout(() => setToast(false), 2800);
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <header className="sticky top-0 z-30 border-b border-[color:var(--divider)] bg-[color:var(--bg)]/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <p className="text-2xl font-semibold text-[color:var(--brand)]">AceDex</p>
          <nav className="hidden items-center gap-8 text-[color:var(--muted)] md:flex">
            <a href="#">Home</a><a href="#" className="text-[color:var(--text)]">Region</a><a href="#">Login</a><a href="#">Help</a><a href="#">About</a>
          </nav>
          <button className="rounded-lg bg-[color:var(--card)] px-4 py-2 text-sm text-[color:var(--muted)]">Connect Wallet</button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 pb-20 pt-14">
        <section className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--brand)]/40 bg-[color:var(--card)] text-2xl text-[color:var(--brand)]">⌖</div>
          <h1 className="text-5xl font-bold leading-tight">Wallet Region Settings By <span className="text-[color:var(--brand)]">AceDex</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl text-[color:var(--muted)]">Manage your cryptocurrency wallet&apos;s regional preferences for optimal performance and compliance</p>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-3xl font-semibold">Current Region</h2>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-8 text-center shadow-[0_12px_40px_var(--shadow)]">
            <div className="mx-auto mb-4 text-5xl text-[color:var(--brand)]">⌖</div>
            {status === 'idle' && <p className="mb-4 text-2xl text-[color:var(--muted)]">No region detected yet</p>}
            {status === 'loading' && (
              <div className="mb-4 space-y-2">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[color:var(--brand)] border-t-transparent" />
                <p className="text-xl">Detecting your region...</p>
                <p className="text-[color:var(--muted)]">10 seconds remaining</p>
              </div>
            )}
            {status === 'detected' && (
              <div className="mb-4 space-y-2">
                <p className="text-[color:var(--muted)]">Auto-detected based on your IP</p>
                <span className="inline-flex rounded-lg bg-[color:var(--badge-warn-bg)] px-3 py-1 text-sm font-medium text-[color:var(--badge-warn-text)]">Restricted</span>
              </div>
            )}
            {status !== 'detected' ? (
              <button onClick={handleCheckRegion} disabled={status === 'loading'} className="rounded-lg bg-[color:var(--brand)] px-8 py-2.5 font-medium text-white transition hover:bg-[color:var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-70 active:bg-[color:var(--brand-active)]">Check My Region</button>
            ) : (
              <button onClick={() => setStatus('idle')} className="rounded-lg bg-[color:var(--brand)] px-8 py-2.5 font-medium text-white transition hover:bg-[color:var(--brand-hover)] active:bg-[color:var(--brand-active)]">Check Again</button>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-semibold">Select New Region</h2>
          <div className="mt-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search regions..."
              className="w-full bg-transparent text-[color:var(--text)] placeholder:text-[color:var(--muted)] focus:outline-none"
            />
          </div>
          <p className="mt-6 text-xs uppercase tracking-widest text-[color:var(--muted)]">Recommended Regions</p>

          <div className="mt-2 space-y-1">
            {visibleRegions.map((region) => (
              <RegionRow key={region.country} region={region} onClick={setSelected} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mx-auto mt-4 flex items-center gap-1 text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
          >
            {expanded ? 'Less' : 'More (8 more regions)'} <span className={`transition ${expanded ? 'rotate-180' : ''}`}>⌄</span>
          </button>
        </section>

        <section className="mt-16 text-center">
          <h3 className="text-5xl font-semibold">Why Change Your Region?</h3>
          <p className="mx-auto mt-5 max-w-3xl text-xl text-[color:var(--muted)]">
            Changing your region ensures compliance with local regulations and prevents potential asset restrictions. Some regions may have limited access to certain features or face regulatory restrictions.
          </p>
        </section>

        <section className="mt-16">
          <h3 className="text-center text-4xl font-semibold">How to Change Your Region</h3>
          <div className="mx-auto mt-8 max-w-3xl space-y-6">
            {[
              ['1', 'Select a Region', 'Click on any country from the recommended regions list above to begin the region change process.'],
              ['2', 'Connect Your Wallet', "You'll be prompted to connect your cryptocurrency wallet to verify your identity and authorize the change."],
              ['3', 'Confirm Transaction', 'Review the region change fee and confirm the transaction in your wallet. Once confirmed, your region will be updated immediately.'],
            ].map(([step, title, text]) => (
              <div className="flex gap-4" key={step}>
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand)]/20 font-semibold text-[color:var(--brand)]">{step}</div>
                <div>
                  <p className="text-2xl font-semibold">{title}</p>
                  <p className="mt-1 text-lg text-[color:var(--muted)]">{text}</p>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 text-center text-[color:var(--muted)]">
              <span className="text-[color:var(--brand)]">Note:</span> Region changes are processed on-chain and require a small transaction fee to prevent abuse.
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[color:var(--divider)] bg-[color:var(--bg)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-4">
          <div>
            <p className="text-3xl font-semibold text-[color:var(--brand)]">AceDex</p>
            <p className="mt-3 text-[color:var(--muted)]">Decentralized protocol for syncing wallet issues on secure servers. Resolving noncustodial wallet problems across all major blockchains.</p>
          </div>
          <div><p className="mb-3 font-semibold">Protocol</p><p className="text-[color:var(--muted)]">Wallet Sync</p><p className="text-[color:var(--muted)]">Security</p><p className="text-[color:var(--muted)]">Status</p></div>
          <div><p className="mb-3 font-semibold">Support</p><p className="text-[color:var(--muted)]">Help Center</p><p className="text-[color:var(--muted)]">Contact</p></div>
          <div><p className="mb-3 font-semibold">Company</p><p className="text-[color:var(--muted)]">About</p></div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 border-t border-[color:var(--divider)] px-5 py-6 text-[color:var(--muted)] md:flex-row">
          <p>© 2019 AceDex. All rights reserved.</p>
          <p>Privacy Policy &nbsp;&nbsp; Terms & Conditions</p>
        </div>
      </footer>

      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-5">
          <div className="w-full max-w-md rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-2xl">
            <h4 className="text-2xl font-semibold">Confirm Region Change</h4>
            <p className="mt-2 text-[color:var(--muted)]">You selected <span className="text-[color:var(--text)]">{selected.country}</span>.</p>
            <div className="mt-4 rounded-xl border border-[color:var(--border)] px-4 py-3">
              <p className="text-sm text-[color:var(--muted)]">Region change fee</p>
              <p className="text-lg font-semibold text-[color:var(--brand)]">{selected.fee}</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setSelected(null)} className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-[color:var(--muted)] hover:bg-[color:var(--bg)]">Cancel</button>
              <button onClick={confirmRegionChange} className="rounded-lg bg-[color:var(--brand)] px-4 py-2 text-white hover:bg-[color:var(--brand-hover)]">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed right-5 top-20 z-50 rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-[color:var(--text)] shadow-lg">
          Region updated successfully.
        </div>
      )}
    </div>
  );
}
