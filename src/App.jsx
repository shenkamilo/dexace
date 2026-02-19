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

const extraRegions = [
  { flag: '🇨🇦', country: 'Canada', fee: '$0.01 USD' },
  { flag: '🇦🇺', country: 'Australia', fee: '$0.01 USD' },
  { flag: '🇳🇱', country: 'Netherlands', fee: '$0.01 USD' },
  { flag: '🇮🇪', country: 'Ireland', fee: '$0.01 USD' },
  { flag: '🇩🇰', country: 'Denmark', fee: '$0.01 USD' },
  { flag: '🇳🇴', country: 'Norway', fee: '$0.01 USD' },
  { flag: '🇸🇪', country: 'Sweden', fee: '$0.01 USD' },
  { flag: '🇦🇹', country: 'Austria', fee: '$0.01 USD' },
];

function RegionRow({ region, onSelect }) {
  return (
    <button className="region-row" type="button" onClick={() => onSelect(region)}>
      <div className="region-left">
        <span className="region-flag" aria-hidden="true">{region.flag}</span>
        <div>
          <p className="region-name">{region.country}</p>
          {region.recommended && <span className="recommended-badge">Recommended</span>}
        </div>
      </div>

      <div className="region-right">
        <p>
          <span className="fee-value">{region.fee}</span>
          <span className="fee-label"> Fee</span>
        </p>
        <span className="region-chevron">›</span>
      </div>
    </button>
  );
}

export default function App() {
  const [currentRegionState, setCurrentRegionState] = useState('idle');
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const visibleRecommended = useMemo(
    () => recommendedRegions.filter((item) => item.country.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const visibleExtra = useMemo(
    () => extraRegions.filter((item) => item.country.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const handleCheckRegion = () => {
    setCurrentRegionState('loading');
    setTimeout(() => setCurrentRegionState('detected'), 2000);
  };

  const handleConfirmRegion = () => {
    setSelectedRegion(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2400);
  };

  return (
    <div className="page-root">
      <main className="page-wrap">
        <section className="hero-section">
          <div className="hero-icon">⌖</div>
          <h1>Wallet Region Settings By AceDex</h1>
          <p>Manage your cryptocurrency wallet&apos;s regional preferences for optimal performance and compliance</p>
        </section>

        <section className="section-block">
          <h2>Current Region</h2>
          <div className="panel">
            <div className="pin-icon">⌖</div>

            {currentRegionState === 'idle' && <p className="muted-lg">No region detected yet</p>}

            {currentRegionState === 'loading' && (
              <div className="loading-box">
                <span className="spinner" aria-hidden="true" />
                <p>Detecting your region...</p>
                <p className="muted">10 seconds remaining</p>
              </div>
            )}

            {currentRegionState === 'detected' && (
              <div className="loading-box">
                <p className="muted">Auto-detected based on your IP</p>
                <span className="restricted-badge">Restricted</span>
              </div>
            )}

            {currentRegionState === 'detected' ? (
              <button className="brand-btn" type="button" onClick={() => setCurrentRegionState('idle')}>
                Check Again
              </button>
            ) : (
              <button className="brand-btn" type="button" disabled={currentRegionState === 'loading'} onClick={handleCheckRegion}>
                Check My Region
              </button>
            )}
          </div>
        </section>

        <section className="section-block">
          <h2>Select New Region</h2>
          <p className="muted helper">Choose a region to optimize access and compliance.</p>

          <div className="search-box">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search regions..."
              aria-label="Search regions"
            />
          </div>

          <p className="regions-label">RECOMMENDED REGIONS</p>
          <div className="regions-list">
            {visibleRecommended.map((region) => (
              <RegionRow key={region.country} region={region} onSelect={setSelectedRegion} />
            ))}
          </div>

          <div className={`extra-wrap ${isExpanded ? 'expanded' : ''}`}>
            <div className="regions-list">
              {visibleExtra.map((region) => (
                <RegionRow key={region.country} region={region} onSelect={setSelectedRegion} />
              ))}
            </div>
          </div>

          <button type="button" className="more-btn" onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? 'Less' : 'More (8 more regions)'} <span className={`more-chevron ${isExpanded ? 'up' : ''}`}>⌄</span>
          </button>
        </section>

        <section className="section-block why">
          <h3>Why Change Your Region?</h3>
          <p>
            Changing your region ensures compliance with local regulations and prevents potential asset restrictions. Some regions may have limited access to certain features or face regulatory restrictions.
          </p>
        </section>

        <section className="section-block how">
          <h3>How to Change Your Region</h3>
          <div className="steps">
            <div className="step"><span>1</span><div><h4>Select a Region</h4><p>Click on any country from the recommended regions list above to begin the region change process.</p></div></div>
            <div className="step"><span>2</span><div><h4>Connect Your Wallet</h4><p>You&apos;ll be prompted to connect your cryptocurrency wallet to verify your identity and authorize the change.</p></div></div>
            <div className="step"><span>3</span><div><h4>Confirm Transaction</h4><p>Review the region change fee and confirm the transaction in your wallet. Once confirmed, your region will be updated immediately.</p></div></div>
          </div>
          <div className="note"><strong>Note:</strong> Region changes are processed on-chain and require a small transaction fee to prevent abuse.</div>
        </section>
      </main>

      {selectedRegion && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h4>Confirm Region Change</h4>
            <p>You selected <strong>{selectedRegion.country}</strong>.</p>
            <div className="fee-card">
              <span>Region change fee</span>
              <strong>{selectedRegion.fee}</strong>
            </div>
            <div className="modal-actions">
              <button type="button" className="ghost-btn" onClick={() => setSelectedRegion(null)}>Cancel</button>
              <button type="button" className="brand-btn" onClick={handleConfirmRegion}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && <div className="toast">Region updated successfully.</div>}
    </div>
  );
}
