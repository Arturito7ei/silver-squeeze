/**
 * Snapshot compiled 2026-11-17 from public secondary reports of CME
 * COMEX copper warehouse stocks. Not a CME DataMine feed.
 *
 * Sources:
 * - https://thevaultreport.com/metals/copper (as of 2026-11-13)
 * - https://thevaultreport.com/comex
 * - https://thevaultreport.com/charts/comex/copper
 */
export const dashboardData = {
  "lastUpdate": "2026-11-13 (COMEX warehouse report via The Vault Report)",
  "sourceUrl": "https://thevaultreport.com/metals/copper",
  "sourceComex": "https://thevaultreport.com/comex",
  "riskScore": 16,
  "registeredKst": 469.1,
  "eligibleKst": 336.3,
  "totalKst": 805.5,
  "reqTotalPct": 58.2,
  "registeredDelta30dPct": -0.4,
  "registeredRange30d": {
    "low": 469.1,
    "high": 479
  },
  "registeredDelta7dPct": 0,
  "crossed450KstDate": "2026-08-25",
  "coverageRatio": 12.5,
  "paperPhysicalRatio": 8,
  "impliedPaperKst": 3344,
  "openInterestContracts": 282_640,
  "openInterestKst": 3533,
  "daysCover": 498,
  "daysCoverBasis": "Withdrawal cover (registered / avg daily withdrawal; arrivals not counted)",
  "delivery": {
    "stops30dContracts": 15326,
    "stops30dKst": 191.6,
    "stops30dValueB": 2.6,
    "stops30dPctRegistered": 40.8,
    "sep4Contracts": 40,
    "sep4Kst": 0.5,
    "sep4VaultFlow": "+480 st FILLING (received +1.6K, withdrawn \u22121.1K; eligible +480, registered 0)",
    "deliveryMonth": "2026-09"
  },
  "chips": {
    "status": {
      "text": "WATCH",
      "variant": "neutral" as const
    },
    "tightness": {
      "text": "8-MO HIGH",
      "variant": "warning" as const
    },
    "coverage": {
      "text": "8:1 PAPER",
      "variant": "ok" as const
    },
    "cover": {
      "text": "498D COVER",
      "variant": "ok" as const
    },
    "delivery": {
      "text": "DRAINING",
      "variant": "warning" as const
    }
  },
  "alerts": [
    {
      "severity": "info" as const,
      "label": "8-MONTH HIGH",
      "text": "Vault Report: registered inventory at 8-month high (100th percentile of 8-mo record) \u2014 amply stocked and still building"
    },
    {
      "severity": "info" as const,
      "label": "REGISTERED DRAINING",
      "text": "469.1K st registered (-0.4% over 30d, range 470.3\u2013479K st)"
    },
    {
      "severity": "info" as const,
      "label": "STOCKS MIX",
      "text": "Eligible 289.6K st \u00b7 Total 767.3K st \u00b7 Req/Total 62.3%"
    },
    {
      "severity": "warning" as const,
      "label": "30D STOPS",
      "text": "15,044 contracts stopped (188.1K st, ~$2.6B) \u2248 39% of registered; Sep 4 house stop 40 contracts (500 st)"
    },
    {
      "severity": "info" as const,
      "label": "NO SQUEEZE SETUP",
      "text": "Risk Score 16/100 \u2014 WATCH; 8:1 paper shown; 498d cover; inventory draining"
    }
  ],
  "registeredHistory": [
    {
      "month": "08/20",
      "value": 448.5
    },
    {
      "month": "09/04",
      "value": 477.7
    },
    {
      "month": "Oct",
      "value": 474.6
    },
    {
      "month": "Nov",
      "value": 469.1
    }
  ],
  "coverageHistory": [
    {
      "month": "09/04",
      "value": 14
    },
    {
      "month": "11/13",
      "value": 12.5
    }
  ],
  "registeredAvg": 460,
  "registeredCritical": 400,
  "coverageAvg": 14,
  "coverageTight": 15,
  "registeredYDomain": [440, 490] as [number, number],
  "coverageYDomain": [10, 20] as [number, number]
}
