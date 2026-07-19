import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormWizard from '../components/FormWizard.jsx';
import Button from '../components/Button.jsx';
import Alert from '../components/Alert.jsx';

/**
 * Demo page showcasing the reusable FormWizard component.
 * Walks through a fictional "Create Vault" flow to highlight
 * step transitions, validation, review, and submission.
 */
export default function WizardDemo() {
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleComplete = async (data) => {
    setSubmitting(true);
    // Simulate a network request
    await new Promise((r) => setTimeout(r, 1500));
    setResult(data);
    setSubmitting(false);
  };

  const reset = () => {
    setResult(null);
  };

  if (result) {
    return (
      <div className="vault-detail">
        <Link to="/dashboard" className="back-link">
          ← Back to dashboard
        </Link>
        <h1 className="page-title">Wizard Demo</h1>

        <div className="wizard-success" style={{ margin: '2rem 0' }}>
          <span className="wizard-success-icon">🎉</span>
          <div className="wizard-success-title">Form submitted successfully!</div>
          <div className="wizard-success-desc">
            Here is what you submitted:
          </div>
          <pre
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1rem',
              marginTop: '0.75rem',
              textAlign: 'left',
              fontSize: '0.82rem',
              color: 'var(--accent)',
              overflowX: 'auto',
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
          <Button onClick={reset} variant="secondary" style={{ marginTop: '1rem' }}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  const steps = [
    {
      id: 'basics',
      title: 'Basics',
      description: 'Vault name and asset',
      icon: '⚙️',
      content: BasicsStep,
    },
    {
      id: 'strategy',
      title: 'Strategy',
      description: 'Risk and investment strategy',
      icon: '📊',
      content: StrategyStep,
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Confirm your settings',
      icon: '📋',
      content: ReviewStep,
    },
    {
      id: 'deploy',
      title: 'Deploy',
      description: 'Deploy the vault',
      icon: '🚀',
      content: DeployStep,
    },
  ];

  const validate = (stepIndex, data) => {
    const errors = {};
    if (stepIndex === 0) {
      if (!data.name || data.name.trim().length < 3) {
        errors.name = 'Vault name must be at least 3 characters';
      }
      if (!data.asset) {
        errors.asset = 'Please select an asset';
      }
      if (!data.depositCap || Number(data.depositCap) <= 0) {
        errors.depositCap = 'Deposit cap must be greater than 0';
      }
    }
    if (stepIndex === 1) {
      if (!data.strategy) {
        errors.strategy = 'Please select a strategy';
      }
    }
    return errors;
  };

  // ── Step 1: Basics ──
  function BasicsStep({ data, setData, errors }) {
    return (
      <div className="vault-form">
        <div className="form-row">
          <label htmlFor="wiz-name">Vault name</label>
        </div>
        <div className="input-group">
          <input
            id="wiz-name"
            type="text"
            placeholder="e.g. USDC Yield Vault"
            value={data.name || ''}
            onChange={(e) => setData({ name: e.target.value })}
            autoFocus
          />
        </div>
        {errors.name && <p className="field-error">{errors.name}</p>}

        <div className="form-row" style={{ marginTop: '0.5rem' }}>
          <label htmlFor="wiz-asset">Asset</label>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['USDC', 'XLM', 'EURC', 'BTC', 'ETH'].map((a) => (
            <button
              key={a}
              type="button"
              className={`btn ${data.asset === a ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setData({ asset: a })}
              style={{ flex: 1, minWidth: '70px' }}
            >
              {a}
            </button>
          ))}
        </div>
        {errors.asset && <p className="field-error">{errors.asset}</p>}

        <div className="form-row" style={{ marginTop: '0.5rem' }}>
          <label htmlFor="wiz-cap">Deposit cap ({data.asset || 'USD'})</label>
        </div>
        <div className="input-group">
          <input
            id="wiz-cap"
            type="number"
            min="0"
            step="any"
            placeholder="e.g. 1000000"
            value={data.depositCap || ''}
            onChange={(e) => setData({ depositCap: e.target.value })}
          />
        </div>
        {errors.depositCap && <p className="field-error">{errors.depositCap}</p>}
      </div>
    );
  }

  // ── Step 2: Strategy ──
  function StrategyStep({ data, setData, errors }) {
    const strategies = [
      { id: 'lending', label: 'Lending', desc: 'Lend assets across Soroban money markets', risk: 'Low', icon: '🏦' },
      { id: 'liquidity', label: 'Liquidity', desc: 'Provide liquidity to AMM pools', risk: 'Medium', icon: '💧' },
      { id: 'farming', label: 'Yield Farming', desc: 'Multi-protocol yield optimization', risk: 'High', icon: '🌾' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {strategies.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setData({ strategy: s.id, strategyRisk: s.risk, strategyLabel: s.label })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: data.strategy === s.id ? 'var(--surface)' : 'var(--surface-2)',
              border: `2px solid ${data.strategy === s.id ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: 'var(--radius)',
              padding: '0.85rem 1rem',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'var(--text)',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.1rem' }}>{s.desc}</div>
            </div>
            <span className={`risk-badge risk-${s.risk.toLowerCase()}`}>{s.risk}</span>
          </button>
        ))}
        {errors.strategy && <p className="field-error">{errors.strategy}</p>}
      </div>
    );
  }

  // ── Step 3: Review ──
  function ReviewStep({ data }) {
    return (
      <div className="wizard-review">
        <div className="wizard-review-row">
          <span className="wizard-review-label">Vault name</span>
          <span className="wizard-review-value">{data.name}</span>
        </div>
        <div className="wizard-review-divider" />
        <div className="wizard-review-row">
          <span className="wizard-review-label">Asset</span>
          <span className="wizard-review-value">{data.asset}</span>
        </div>
        <div className="wizard-review-row">
          <span className="wizard-review-label">Deposit cap</span>
          <span className="wizard-review-value">
            {Number(data.depositCap).toLocaleString()} {data.asset}
          </span>
        </div>
        <div className="wizard-review-divider" />
        <div className="wizard-review-row">
          <span className="wizard-review-label">Strategy</span>
          <span className="wizard-review-value">{data.strategyLabel}</span>
        </div>
        <div className="wizard-review-row">
          <span className="wizard-review-label">Risk level</span>
          <span className="wizard-review-value" style={{ color: data.strategyRisk === 'Low' ? 'var(--gain)' : data.strategyRisk === 'Medium' ? '#f1c40f' : 'var(--loss)' }}>
            {data.strategyRisk}
          </span>
        </div>
      </div>
    );
  }

  // ── Step 4: Deploy ──
  function DeployStep({ data }) {
    return (
      <div className="wizard-success">
        <span className="wizard-success-icon" style={{ fontSize: '2.5rem' }}>
          {submitting ? '⏳' : '🚀'}
        </span>
        <div className="wizard-success-title">
          {submitting ? 'Deploying vault…' : 'Ready to deploy'}
        </div>
        <div className="wizard-success-desc">
          {submitting
            ? 'Your vault is being deployed on the Soroban network.'
            : 'Review the details above and click "Complete" to deploy your vault.'}
        </div>
        {!submitting && (
          <Alert variant="info" title="Gas estimate">
            Estimated deployment cost: ~0.15 XLM. Funds will be deducted from your connected wallet.
          </Alert>
        )}
      </div>
    );
  }

  return (
    <div className="vault-detail">
      <Link to="/dashboard" className="back-link">
        ← Back to dashboard
      </Link>

      <h1 className="page-title">Create a New Vault</h1>
      <p className="muted" style={{ marginBottom: '1.5rem' }}>
        Use the multi-step wizard to configure and deploy a new yield vault on Soroban.
      </p>

      <FormWizard
        steps={steps}
        initialData={{
          name: '',
          asset: '',
          depositCap: '',
          strategy: '',
          strategyRisk: '',
          strategyLabel: '',
        }}
        onComplete={handleComplete}
        validate={validate}
        submitting={submitting}
        completeLabel="Deploy Vault"
        completingLabel="Deploying…"
      />
    </div>
  );
}
