/* ══════════════════════════════════════════════════════════════════════════
   50-content.js — the bank

   Sixteen content posts, three listing records and twenty-one LinkedIn
   pieces. The week's rotation draws from here, so the page produces a new
   set every Monday without anybody editing anything. Add to the arrays and
   the rotation picks the additions up on its own.

   House voice: specific, unhedged, no exclamation marks, no "unlock".
   Numbers are directional and labelled as such. Nothing here quotes a
   statute; where a rule has a threshold that moves, the post says so.
   ══════════════════════════════════════════════════════════════════════════ */

const CONTENT = [

{ id: 'c1031', topic: '1031 Exchange', kicker: 'The Brief',
  title: 'The exchange is not the hard part. *The calendar is.*',
  sub: '45 days to identify. 180 days to close. Weekends and holidays count, and day 46 is not day 45.',
  pointsTitle: 'Where exchanges break',
  points: [
    ['Sell first, shop second', 'and you are negotiating with a gun to your head.'],
    ['Identify in writing', 'within 45 days of the close. Verbal is not identification.'],
    ['Close within 180 days.', 'There is no extension and no grace period.'],
    ['Line up replacements', 'before your sale closes, not after it does.'],
    ['Choose the intermediary', 'before escrow opens, not during it.'],
    ['Have a backup property.', 'Deals fall out. The clock does not stop for it.']
  ],
  figurePair: ['45', '180'], figurePairLabels: ['days to identify', 'days to close'],
  figureLabel: 'The Clock', figureKicker: 'Both run from the same day',
  pull: 'Every failed exchange we have watched failed on day one, not on day 46.',
  ctaKicker: 'Planning an exchange?', cta: 'We map the timeline *before* you list, not after.',
  stats: [['45', 'Days to ID'], ['180', 'Days to Close'], ['0', 'Extensions']],
  cap: `The 1031 clock: 45 days to identify, 180 days to close. Weekends and holidays count.

Here is what actually goes wrong — people sell first and shop second. Now you are 45 days out and every seller can smell it. You overpay, or you blow the exchange and hand over the gains you were deferring.

The version that works looks boring. Replacement candidates lined up before the sale closes. A backup. An intermediary chosen before escrow opens.

Planning one? Call or text 310.300.2838.`,
  tags: '#1031Exchange #CommercialRealEstate #CRE #CapitalGains #InvestmentProperty #TaxDeferred #RealEstateTips #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #NetLease #RealEstateInvesting #WealthBuilding' },

{ id: 'ccap', topic: 'Underwriting', kicker: 'The Brief',
  title: 'The cap rate on the flyer *is not the cap rate.*',
  sub: 'A broker sends you a 6.5%. You run it yourself and get 5.1%. Neither of you is lying — you are counting differently.',
  pointsTitle: 'What the flyer leaves out',
  points: [
    ['Scheduled rent, not collected.', 'The flyer counts what should arrive.'],
    ['Vacancy left out entirely,', 'as though the building never turns.'],
    ['Last year’s taxes', 'instead of what the county reassesses to on sale.'],
    ['Management at 3%', 'when nobody runs a twelve-unit for three points.'],
    ['No reserves, no leasing costs,', 'no capital line at all.'],
    ['Ask for the trailing twelve.', 'If they will not produce it, that is information.']
  ],
  figure: '80–150', figureSub: 'basis points, typically', figureLabel: 'The Spread',
  figureKicker: 'Marketing cap vs the real one',
  bars: [{ k: 'Flyer', v: 6.5, t: '6.5%' }, { k: 'Adjusted', v: 5.8, t: '5.8%' }, { k: 'Actual', v: 5.1, t: '5.1%', hi: true }],
  pull: 'That gap is not fraud. It is convention. It is also the difference between the deal you think you bought and the one you own.',
  ctaKicker: 'Looking at something?', cta: 'Send it over. We will underwrite it *honestly.*',
  stats: [['6.5%', 'On the Flyer'], ['5.1%', 'In Reality'], ['80–150', 'Basis Points']],
  cap: `The cap rate on the flyer is not the cap rate.

A broker sends you a 6.5% cap. You run it yourself and get 5.1%. Neither of you is lying — you are counting differently.

The flyer uses scheduled rent, not collected. It leaves out vacancy. It uses last year's taxes instead of the reassessment. Management shows at 3% when nobody manages a twelve-unit for 3%.

None of that is fraud. It is convention. On the deals we underwrite in LA that spread runs 80 to 150 basis points.

Ask for the trailing twelve. Not the pro forma.`,
  tags: '#CapRate #CommercialRealEstate #CRE #Underwriting #InvestmentProperty #RealEstateInvesting #DueDiligence #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #NOI #ValueAdd #RealEstateTips' },

{ id: 'cwait', topic: 'Pricing', kicker: 'The Brief',
  title: 'What holding out *actually costs.*',
  sub: 'He wanted $2.6M. The market said $2.4M. Fourteen months later he took $2.45M and called it a win.',
  pointsTitle: 'The invoice nobody sent him',
  points: [
    ['Fourteen months of carry,', 'taxes and insurance, every single month.'],
    ['A vacancy he covered', 'for the entire time he was waiting.'],
    ['A rate environment', 'that moved against him while he held.'],
    ['Buyers who moved on', 'and never came back to the table.'],
    ['A listing that now shows', 'as stale on every platform that matters.'],
    ['He beat the offer by $50,000', 'and lost money doing it.']
  ],
  figure: '$50,000', figureSub: 'what he beat the offer by', figureLabel: 'On Paper',
  figureKicker: 'Before the carry',
  pull: 'He did not lose because he was greedy. He lost because nobody put the cost of waiting on the same page as the price.',
  ctaKicker: 'Own something you are weighing up?', cta: 'Know what your number *costs to defend.*',
  stats: [['14', 'Months Waited'], ['$50K', 'Paper Gain'], ['$0', 'Real Gain']],
  cap: `What holding out actually costs.

A seller wanted $2.6M. The market said $2.4M. He waited fourteen months for his number and got $2.45M.

On paper he beat the offer by $50,000. In reality: fourteen months of carry, taxes and insurance. A vacancy he covered the whole time. A rate environment that moved against him.

He did not lose because he was greedy. He lost because nobody sat down and put the cost of waiting on the same page as the price.

That is the conversation worth having before you list. 310.300.2838`,
  tags: '#CommercialRealEstate #CRE #SellCommercial #PropertyValuation #RealEstateStrategy #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #BrokerOpinionOfValue #RealEstateTips #DaysOnMarket #ThinkingOfSelling' },

{ id: 'crent', topic: 'Due Diligence', kicker: 'The Brief',
  title: 'Read the rent roll *before* the offering memorandum.',
  sub: 'The OM is marketing. The rent roll is a confession. Only one of them is trying to persuade you.',
  pointsTitle: 'What the roll tells you',
  points: [
    ['Who is actually paying', 'versus who is merely listed on a line.'],
    ['How many leases roll', 'inside the next eighteen months.'],
    ['Whether rents are market', 'or a favour somebody did for a friend.'],
    ['What concessions and free rent', 'got averaged into a clean-looking number.'],
    ['Security deposits held,', 'and whether they are actually still there.'],
    ['How fast they send it.', 'That answer is its own piece of information.']
  ],
  figure: 'T-12', figureSub: 'trailing twelve months', figureLabel: 'Ask For',
  figureKicker: 'On day one, not day thirty',
  pull: 'An OM is written to be believed. A rent roll is written to be filed.',
  ctaKicker: 'In escrow on something?', cta: 'We will read the file with you.',
  stats: [['18', 'Months to Check'], ['T-12', 'Ask for It'], ['Day 1', 'When to Ask']],
  cap: `Read the rent roll before the offering memorandum.

The OM is marketing — beautiful photos, a strong narrative, a stabilised pro forma. It is written to be believed. The rent roll is written to be filed. That is the difference.

It tells you who is actually paying, how many leases roll in eighteen months, whether the rents are market or a favour, and what concessions got averaged into a clean number.

Ask for the rent roll and the trailing twelve on day one. How fast they come back is its own piece of information.`,
  tags: '#DueDiligence #RentRoll #CommercialRealEstate #CRE #Underwriting #InvestmentProperty #RealEstateInvesting #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #NOI #OfferingMemorandum #RealEstateTips' },

{ id: 'coffmkt', topic: 'Deal Flow', kicker: 'The Brief',
  title: 'The good deals are gone *before they are listed.*',
  sub: 'By the time a property hits the platforms, forty people have already passed on it. That is not a conspiracy. It is just how it moves.',
  pointsTitle: 'How it actually trades',
  points: [
    ['An owner mentions', 'to somebody that they are tired.'],
    ['No listing, no sign,', 'no photographer, no launch date.'],
    ['A broker who knows a buyer', 'for exactly that asset picks up the phone.'],
    ['It trades in three weeks', 'and never appears anywhere.'],
    ['Be specific and be reachable.', 'Vague buyers do not get the call.'],
    ['“Good opportunities in LA”', 'tells a broker nothing and gets nothing.']
  ],
  figure: '3', figureSub: 'weeks, start to signed', figureLabel: 'Off Market',
  figureKicker: 'When the buyer is already known',
  pull: 'You do not get on that call by refreshing listing alerts. You get on it by being the specific answer to a question somebody is about to ask.',
  ctaKicker: 'Want to be on that call?', cta: 'Tell us the box. We will call when it fits.',
  stats: [['3', 'Weeks to Trade'], ['0', 'Listings Seen'], ['1', 'Phone Call']],
  cap: `The good deals are gone before they are listed.

By the time a property hits the platforms, forty people have already passed on it. That is not a conspiracy — it is just how it moves.

An owner mentions to somebody that they are tired. No listing, no sign. A broker who knows a specific buyer picks up the phone. It trades in three weeks.

"Industrial, San Fernando Valley, 5 to 15 thousand feet, can close in 30 days" gets a phone call. "Looking for good opportunities in LA" gets nothing, because it says nothing.

Say the specific thing, out loud, to people who see deals. 310.300.2838`,
  tags: '#OffMarket #DealFlow #CommercialRealEstate #CRE #InvestmentProperty #RealEstateInvesting #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #PocketListing #SanFernandoValley #IndustrialRealEstate #BuyerRepresentation' },

{ id: 'cnnn', topic: 'Net Lease', kicker: 'The Brief',
  title: 'A 4.25% cap is not expensive. *It is a different product.*',
  sub: 'Every time a new NNN deal prices in the low fours, somebody says the buyer overpaid. They are comparing two things that are not the same thing.',
  pointsTitle: 'Two different questions',
  points: [
    ['Fifteen years absolute net', 'to a credit tenant is not operating income.'],
    ['It is closer to a bond', 'that happens to sit on a hard corner.'],
    ['You are buying certainty,', 'financeability, and quiet Tuesdays.'],
    ['The value-add at an 8', 'is a job. Sometimes a very good one.'],
    ['Neither one is wrong.', 'They answer different questions.'],
    ['The mistake is buying one', 'while expecting the other one’s returns.']
  ],
  figurePair: ['4.25%', '8%'], figurePairLabels: ['credit, passive', 'value-add, hands-on'],
  figureLabel: 'The Trade', figureKicker: 'Same money, different job',
  pull: 'Buy the 4.25 expecting the 8’s returns, or the 8 expecting the 4.25’s Tuesdays, and you have bought the wrong building either way.',
  ctaKicker: 'Deciding between the two?', cta: 'We will model both against your actual timeline.',
  stats: [['4.25%', 'Credit NNN'], ['8%', 'Value-Add'], ['15 yr', 'Typical Term']],
  cap: `A 4.25% cap is not expensive. It is a different product.

A fifteen-year absolute net lease to a credit tenant, with scheduled increases and zero landlord responsibilities, is not real estate operating income. It is closer to a bond that happens to sit on a hard corner.

You are not buying upside. You are buying certainty, financeability, and never taking a call about a roof.

The value-add deal at an 8 is a job. Sometimes a very good one. But it is a job.

Neither is wrong. They are answers to different questions. 310.300.2838`,
  tags: '#NetLease #NNN #CommercialRealEstate #CRE #CapRate #InvestmentProperty #PassiveIncome #RealEstateInvesting #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #CreditTenant #ValueAdd' },

{ id: 'cprop13', topic: 'Property Tax', kicker: 'The Brief',
  title: 'The seller’s tax bill is *not going to be your tax bill.*',
  sub: 'A building held for thirty years carries a thirty-year-old assessment. On sale, that resets — and the pro forma you were handed usually does not.',
  pointsTitle: 'What resets at close',
  points: [
    ['A change of ownership', 'triggers a reassessment to market value.'],
    ['The old base year value', 'goes with the old owner, not with the building.'],
    ['Your new basis', 'is generally what you just paid for it.'],
    ['A long-held asset', 'can see the tax line multiply on close.'],
    ['That lands in year one,', 'straight out of NOI, not year five.'],
    ['Underwrite the reset,', 'not the number on the current bill.']
  ],
  figure: 'Year 1', figureSub: 'when the new bill arrives', figureLabel: 'The Reset',
  figureKicker: 'Not year five',
  pull: 'The single most common modelling error we see in LA is a buyer carrying the seller’s decades-old tax line straight into their own pro forma.',
  ctaKicker: 'Underwriting something long-held?', cta: 'We will run it on the reassessed basis.',
  stats: [['Year 1', 'Reset Lands'], ['NOI', 'What It Hits'], ['Sale', 'What Triggers It']],
  cap: `The seller's tax bill is not going to be your tax bill.

A building held for thirty years carries a thirty-year-old assessment. A change of ownership generally resets that to market value — which, in practice, means roughly what you just paid.

The pro forma you were handed usually still shows the old number. That difference does not show up in year five. It shows up in year one, straight out of NOI.

Underwriting something that has been in a family a long time? Run it on the reassessed basis before you fall in love with the cap rate. 310.300.2838

Not tax advice — talk to your CPA on your specific facts.`,
  tags: '#PropertyTax #Prop13 #CommercialRealEstate #CRE #Underwriting #InvestmentProperty #DueDiligence #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #NOI #RealEstateInvesting #CaliforniaRealEstate' },

{ id: 'cdom', topic: 'Days on Market', kicker: 'The Brief',
  title: 'Nobody buys *the third price cut.*',
  sub: 'Overprice by ten percent and you do not lose ten percent. You lose the first three weeks, which is when your real buyers were looking.',
  pointsTitle: 'The ladder down',
  points: [
    ['Weeks one to three', 'are when the ready buyers actually look.'],
    ['Priced high, they skip it', 'and never set an alert for it again.'],
    ['Cut one reads as adjustment.', 'Cut two reads as a problem.'],
    ['Cut three reads as distress', 'and invites the offer you did not want.'],
    ['Day count is public', 'and every broker checks it first.'],
    ['Priced right, you get competition.', 'That is the only thing that beats a number.']
  ],
  figure: '3', figureSub: 'weeks of real attention', figureLabel: 'The Window',
  figureKicker: 'Then the file goes cold',
  bars: [{ k: 'Wk 1–3', v: 100, t: 'peak', hi: true }, { k: 'Wk 4–8', v: 46, t: '−54%' }, { k: 'Wk 9+', v: 19, t: '−81%' }],
  pull: 'The price cut does not bring the first three weeks back. Nothing does.',
  ctaKicker: 'About to list?', cta: 'Price it for the first three weeks.',
  stats: [['3', 'Weeks That Matter'], ['3', 'Cuts to Distress'], ['1', 'Chance at Launch']],
  cap: `Nobody buys the third price cut.

Overprice by ten percent and you do not lose ten percent — you lose the first three weeks. That is when the ready buyers, the ones with money and a mandate, actually look.

Priced high, they skip it. They do not come back when you adjust, because they have already spent the attention.

Cut one reads as an adjustment. Cut two reads as a problem. Cut three reads as distress, and distress attracts exactly the offer you did not want.

Price it for the first three weeks. 310.300.2838`,
  tags: '#DaysOnMarket #CommercialRealEstate #CRE #SellCommercial #PropertyValuation #ListingStrategy #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #RealEstateStrategy #BrokerOpinionOfValue #ThinkingOfSelling #InvestmentProperty' },

{ id: 'cestop', topic: 'Due Diligence', kicker: 'The Brief',
  title: 'The estoppel is where the story *stops matching the file.*',
  sub: 'The seller tells you the lease. The tenant signs what they believe the lease to be. When those two documents disagree, you have found the real deal.',
  pointsTitle: 'What the tenant confirms',
  points: [
    ['The rent they actually pay', 'and the date they last paid it.'],
    ['The term and any options', 'they believe they still hold.'],
    ['Deposits held', 'and any credit still owed to them.'],
    ['Side agreements', 'that never made it into the lease file.'],
    ['Outstanding landlord obligations', 'you are about to inherit.'],
    ['Anything in dispute.', 'It becomes yours at close either way.']
  ],
  figure: '100%', figureSub: 'of tenants, before you close', figureLabel: 'Collect',
  figureKicker: 'Not the easy ones only',
  pull: 'A tenant who will not sign an estoppel is telling you something the rent roll was never going to.',
  ctaKicker: 'Working through diligence?', cta: 'We will chase the estoppels with you.',
  stats: [['100%', 'Coverage'], ['Pre-close', 'Timing'], ['Signed', 'Not Verbal']],
  cap: `The estoppel is where the story stops matching the file.

The seller tells you the lease. The tenant signs what they believe the lease to be. When those two disagree, you have found the actual deal.

Rent and last payment date. Term and remaining options. Deposits held. Side agreements that never made it into the file. Outstanding landlord obligations you are about to inherit.

Collect them from every tenant, not just the easy ones. A tenant who will not sign is telling you something the rent roll never would. 310.300.2838`,
  tags: '#DueDiligence #Estoppel #CommercialRealEstate #CRE #LeaseAudit #InvestmentProperty #RealEstateInvesting #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #Escrow #CommercialLeasing #RealEstateTips' },

{ id: 'cula', topic: 'Transfer Tax', kicker: 'The Brief',
  title: 'In the City of LA, the transfer tax *is part of the price.*',
  sub: 'Measure ULA applies to commercial as well as residential. If your building sits inside city limits, it belongs in the model before you set an ask.',
  pointsTitle: 'What to check first',
  points: [
    ['City limits, not county.', 'The line matters more than the postcode.'],
    ['It applies to commercial', 'the same as it does to residential.'],
    ['It is charged on the price,', 'not on the gain, and not on the equity.'],
    ['Thresholds adjust annually,', 'so check the current ones before you list.'],
    ['It changes the net,', 'which changes what a seller will accept.'],
    ['Price with it in the model,', 'not as a surprise in the closing statement.']
  ],
  figure: 'City', figureSub: 'limits decide it', figureLabel: 'The Line',
  figureKicker: 'Check the parcel, not the postcode',
  pull: 'Sellers do not price off the headline number. They price off the wire. Put the transfer tax in the model and the ask stops being a guess.',
  ctaKicker: 'Selling inside the city?', cta: 'We will model the net before you set a price.',
  stats: [['City', 'Not County'], ['Price', 'Not Gain'], ['Annual', 'Threshold Reset']],
  cap: `In the City of LA, the transfer tax is part of the price.

Measure ULA applies to commercial property, not just homes, and it is charged on the sale price — not the gain, not the equity. Thresholds are adjusted annually, so check the current ones rather than the number you remember.

The practical effect: sellers price off the wire, not the headline. If the transfer tax is not in the model before you set an ask, the ask is a guess.

Also worth checking early: whether the parcel is actually inside city limits. That line, not the postcode, is what decides it.

Not tax or legal advice. 310.300.2838`,
  tags: '#MeasureULA #TransferTax #CommercialRealEstate #CRE #LosAngelesRealEstate #LARealEstate #SellCommercial #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #RealEstateStrategy #PropertyTax #DueDiligence #1031Exchange' },

{ id: 'cmaturity', topic: 'Debt', kicker: 'The Brief',
  title: 'The maturity date is *the real deadline.*',
  sub: 'Owners do not usually sell because they want to. They sell because a loan is coming due and the refinance does not work at today’s rates.',
  pointsTitle: 'Start twenty-four months out',
  points: [
    ['Know your maturity date', 'to the month, two years ahead of it.'],
    ['Model the refinance', 'at today’s rate, not the one you signed at.'],
    ['If it does not cover,', 'you have a decision, not an emergency.'],
    ['Twenty-four months out', 'you can sell into a normal market.'],
    ['Six months out', 'the market can read the clock as well as you can.'],
    ['Extensions cost money', 'and rarely fix the underlying gap.']
  ],
  figure: '24', figureSub: 'months of runway', figureLabel: 'Lead Time',
  figureKicker: 'The difference between a plan and a fire sale',
  pull: 'A seller with two years is negotiating. A seller with two months is being negotiated with.',
  ctaKicker: 'Have a maturity coming?', cta: 'Let’s look at it while you still have options.',
  stats: [['24', 'Months Ahead'], ['1', 'Decision'], ['0', 'Emergencies']],
  cap: `The maturity date is the real deadline.

Owners rarely sell because they want to. They sell because a loan is coming due and the refinance does not pencil at today's rates.

Start twenty-four months out. Model the refinance at the rate you would actually get, not the one you signed at. If it does not cover, you have a decision. If you wait until six months out, you have an emergency — and the market can read the clock as well as you can.

A seller with two years is negotiating. A seller with two months is being negotiated with. 310.300.2838`,
  tags: '#CommercialRealEstate #CRE #Refinance #DebtMaturity #InvestmentProperty #RealEstateStrategy #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #SellCommercial #CapitalMarkets #RealEstateInvesting #ThinkingOfSelling' },

{ id: 'cbov', topic: 'Valuation', kicker: 'The Brief',
  title: 'An appraisal tells you what it *was* worth. A broker tells you what it *will trade for.*',
  sub: 'They are different jobs, and only one of them is looking at the buyers who are actually in the market this quarter.',
  pointsTitle: 'The difference in practice',
  points: [
    ['An appraisal looks backward', 'at comparables that already closed.'],
    ['A broker opinion looks forward', 'at buyers currently circling.'],
    ['Closed comps lag', 'the market by three to six months.'],
    ['Live demand does not.', 'It changes with the rate sheet.'],
    ['Lenders need the appraisal.', 'That is what it is built for.'],
    ['You need the other one', 'before you decide what to ask.']
  ],
  figure: '3–6', figureSub: 'months of lag in closed comps', figureLabel: 'The Gap',
  figureKicker: 'Which is why the two disagree',
  pull: 'Both documents are honest. They are answering questions asked at different times.',
  ctaKicker: 'Want to know where yours sits?', cta: 'A broker’s opinion of value, no obligation.',
  stats: [['3–6', 'Months of Lag'], ['0', 'Obligation'], ['197+', 'Transactions']],
  cap: `An appraisal tells you what it was worth. A broker tells you what it will trade for.

An appraisal looks backward at comparables that have already closed. Those lag the market by three to six months. A broker's opinion looks forward, at the buyers circling right now and what they are willing to do this quarter.

Both are honest documents. They answer questions asked at different times. Your lender needs the first one. You need the second one before you decide what to ask.

Complimentary broker's opinion of value — current market, real comps, no obligation. 310.300.2838`,
  tags: '#BrokerOpinionOfValue #PropertyValuation #CommercialRealEstate #CRE #Appraisal #SellCommercial #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #RealEstateStrategy #ThinkingOfSelling #RealEstateTips' },

{ id: 'ccredit', topic: 'Leasing', kicker: 'The Brief',
  title: 'Ten years from a weak tenant *is not ten years.*',
  sub: 'Term is only worth what the covenant behind it is worth. Lenders know that. Buyers who skip it find out at renewal.',
  pointsTitle: 'What term is actually worth',
  points: [
    ['Who signed the lease?', 'The operating entity, or a shell with no assets?'],
    ['Is there a guarantee,', 'and does the guarantor have anything?'],
    ['Franchisee or corporate?', 'The sign out front does not tell you.'],
    ['How long in occupancy,', 'and how much did they spend fitting out?'],
    ['Rent as a share of sales', 'tells you whether they can survive a slow year.'],
    ['A tenant who invested', 'in the space is a tenant who renews.']
  ],
  figure: '0', figureSub: 'value in an unguaranteed shell', figureLabel: 'The Covenant',
  figureKicker: 'Term without covenant',
  pull: 'The lease term is the promise. The covenant is whether the promise is collectable.',
  ctaKicker: 'Buying a leased asset?', cta: 'We will read the covenant, not just the term.',
  stats: [['10 yr', 'On Paper'], ['?', 'Behind It'], ['1', 'Guarantee to Check']],
  cap: `Ten years from a weak tenant is not ten years.

Term is only worth what the covenant behind it is worth. Who actually signed — the operating entity or a shell? Is there a guarantee, and does the guarantor have anything? Franchisee or corporate? The sign out front does not tell you.

Then the softer signals: how long they have been in occupancy, what they spent fitting the space out, rent as a share of sales. A tenant who invested in the space is a tenant who renews.

The lease term is the promise. The covenant is whether it is collectable. 310.300.2838`,
  tags: '#CommercialLeasing #NetLease #CommercialRealEstate #CRE #DueDiligence #CreditTenant #InvestmentProperty #RealEstateInvesting #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #NNN #LeaseAudit' },

{ id: 'ccapex', topic: 'Capital', kicker: 'The Brief',
  title: 'Deferred maintenance is *a price, not a surprise.*',
  sub: 'Every building has a number attached to it. The only question is whether it shows up in your offer or in your second year.',
  pointsTitle: 'The list that moves the number',
  points: [
    ['Roof age and remaining life,', 'in writing, from somebody who climbed it.'],
    ['HVAC units,', 'their age, and what replacement runs today.'],
    ['Electrical capacity', 'against what a modern tenant will ask for.'],
    ['Plumbing and sewer laterals,', 'the two lines nobody inspects until they fail.'],
    ['Parking, ADA and life safety,', 'which get triggered by permits, not by choice.'],
    ['Price it into the offer.', 'The alternative is paying twice.']
  ],
  figure: 'Yr 2', figureSub: 'when the unpriced number arrives', figureLabel: 'The Bill',
  figureKicker: 'It does not go away',
  pull: 'You are buying the capital plan whether you priced it or not.',
  ctaKicker: 'Under contract?', cta: 'Let’s put a number on the capital plan.',
  stats: [['Yr 2', 'When It Lands'], ['1', 'Roof Report'], ['0', 'Surprises']],
  cap: `Deferred maintenance is a price, not a surprise.

Every building has a number attached to it. The only question is whether it shows up in your offer or in your second year.

Roof age and remaining life, in writing, from somebody who actually climbed it. HVAC age against today's replacement cost. Electrical capacity against what a modern tenant will ask for. Sewer laterals — the line nobody inspects until it fails. ADA and life safety, which get triggered by permits rather than by choice.

You are buying the capital plan either way. Price it. 310.300.2838`,
  tags: '#DueDiligence #CapEx #CommercialRealEstate #CRE #PropertyManagement #InvestmentProperty #RealEstateInvesting #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #ValueAdd #BuildingInspection #RealEstateTips' },

{ id: 'ccarry', topic: 'Structure', kicker: 'The Brief',
  title: 'Seller financing is *a pricing tool,* not a favour.',
  sub: 'When debt is expensive, the seller who will carry paper is the seller who gets their number. Sometimes more than their number.',
  pointsTitle: 'Why it clears',
  points: [
    ['A carryback widens the buyer pool', 'to people the banks are currently declining.'],
    ['Terms are negotiable', 'in a way bank debt simply is not.'],
    ['The seller keeps a yield', 'instead of parking the proceeds at nothing.'],
    ['Gains can be spread', 'over the years the payments arrive.'],
    ['Get the security right:', 'first position, personal guarantee, real remedies.'],
    ['It is not for everyone.', 'It is very good for the right seller.']
  ],
  figure: '2', figureSub: 'parties, one negotiation', figureLabel: 'The Structure',
  figureKicker: 'No committee, no rate sheet',
  pull: 'Price and terms are the same conversation. Sellers who understand that get paid for flexibility.',
  ctaKicker: 'Weighing up a carryback?', cta: 'We will structure it and paper it properly.',
  stats: [['2', 'Parties'], ['0', 'Loan Committees'], ['1', 'Negotiation']],
  cap: `Seller financing is a pricing tool, not a favour.

When debt is expensive, the seller who will carry paper is the seller who gets their number — sometimes more than their number, because price and terms are the same conversation.

A carryback widens the buyer pool to people the banks are declining right now. Terms are negotiable in a way bank debt is not. The seller keeps a yield instead of parking proceeds at nothing, and the gain can spread across the years the payments arrive.

Get the security right: position, guarantee, remedies. Not for everyone — very good for the right seller.

Talk to your CPA and counsel on your facts. 310.300.2838`,
  tags: '#SellerFinancing #CommercialRealEstate #CRE #DealStructure #InvestmentProperty #RealEstateInvesting #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #Carryback #CapitalMarkets #SellCommercial #1031Exchange' },

{ id: 'creview', topic: 'Client Review', kicker: 'In Their Words', review: true,
  title: 'It closed *exactly the way* they said it would.',
  sub: 'The part of the job that does not photograph well: telling a seller the number they do not want to hear, early enough for it to help.',
  quote: 'They knew the value of the property better than anyone we spoke to, and they never pushed us toward a number we were not comfortable with. It closed exactly the way they said it would.',
  by: 'Susan K.', byRole: 'Seller · Los Angeles',
  pointsTitle: 'How that happens',
  points: [
    ['An honest number first,', 'even when it is not the one you want.'],
    ['A launch that is ready', 'before it goes live, not after.'],
    ['Buyers called directly,', 'not just posted at and hoped for.'],
    ['Offers compared on terms,', 'not only on the headline price.'],
    ['Escrow managed weekly,', 'so nothing surfaces in the last ten days.'],
    ['One number, held', 'from the first conversation to the wire.']
  ],
  figure: '197+', figureSub: 'transactions behind the advice', figureLabel: 'Track Record',
  figureKicker: 'Greater Los Angeles',
  pull: 'The number we give you at the start is the number we defend at the end.',
  ctaKicker: 'Thinking about selling?', cta: 'Start with an honest number.',
  stats: [['197+', 'Transactions'], ['$471M+', 'Sales Volume'], ['5.0', 'Client Rating']],
  cap: `"They knew the value of the property better than anyone we spoke to, and they never pushed us toward a number we were not comfortable with. It closed exactly the way they said it would."

— Susan K., seller, Los Angeles

The part of this job that does not photograph well is telling a seller the number they do not want to hear, early enough for it to still be useful.

197+ transactions. $471M+ in sales volume. Greater Los Angeles.

Thinking about selling? 310.300.2838`,
  tags: '#ClientReview #Testimonial #CommercialRealEstate #CRE #HirthGroup #CREBroker #LosAngelesRealEstate #SoldByHirth #KWCommercial #LARealEstate #SellCommercial #InvestmentProperty #RealEstateInvesting #BrokerOpinionOfValue #ThinkingOfSelling' },

{ id: 'cpark', topic: 'Parking', kicker: 'The Brief',
  title: 'Parking is not an amenity. *It is the use.*',
  sub: 'The stall count decides what a tenant is allowed to be. Everything else is decoration.',
  pointsTitle: 'What the stall count decides',
  points: [
    ['Restaurants need parking', 'at a ratio most older retail cannot reach.'],
    ['Medical needs more than office,', 'which is why the conversion pencils and then does not.'],
    ['Non-conforming counts', 'are grandfathered until the day you change the use.'],
    ['Shared and reciprocal easements', 'are a document, not an assumption. Read it.'],
    ['Tandem and stacked stalls', 'often do not count toward the requirement at all.'],
    ['Stripe the lot yourself', 'before you believe the number on the flyer.']
  ],
  figurePair: ['1:250', '1:100'], figurePairLabels: ['typical office', 'typical restaurant'],
  figureLabel: 'The Ratio', figureKicker: 'Stalls per thousand square feet',
  pull: 'A building does not lose a tenant because the rent was wrong. It loses the tenant because the use it could support was smaller than the sign out front suggested.',
  ctaKicker: 'Underwriting a conversion?', cta: 'Count the stalls *before* you count the rent.',
  stats: [['1:250', 'Office Ratio'], ['1:100', 'Restaurant'], ['0', 'Assumptions']],
  cap: `Parking is not an amenity. It is the use.

The stall count decides what a tenant is legally allowed to be in that building. Restaurants need a ratio most older retail cannot reach. Medical needs more than office, which is exactly why a conversion pencils on a spreadsheet and then dies at the counter.

Non-conforming counts are grandfathered — until the day you change the use. Then the whole requirement comes back at current code. Shared lots are governed by a reciprocal easement, which is a document you read, not a thing you assume.

Go stripe the lot yourself before you believe the number on the flyer.

Daniel Hirth · 310.300.2838`,
  tags: '#Parking #CommercialRealEstate #CRE #Zoning #DueDiligence #RetailRealEstate #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #ValueAdd #CommercialProperty #RealEstateTips' },

{ id: 'czone', topic: 'Entitlements', kicker: 'The Brief',
  title: 'Zoned for it is not *approved for it.*',
  sub: 'The code tells you what is permitted. The counter tells you what is possible. They are not the same building.',
  pointsTitle: 'Between the code and the keys',
  points: [
    ['By-right means no hearing,', 'not no plan check and not no timeline.'],
    ['A conditional use permit', 'is a discretionary decision. Discretion can say no.'],
    ['Specific plans and overlays', 'sit on top of the base zone and quietly govern it.'],
    ['Neighbourhood councils', 'do not vote, but they are heard, and they remember.'],
    ['Every month of process', 'is a month of carry you are financing.'],
    ['Price the entitlement risk', 'into the land, or the seller keeps it.']
  ],
  figurePair: ['12–24', '0'], figurePairLabels: ['months to entitle', 'guarantees'],
  figureLabel: 'The Process', figureKicker: 'Greater Los Angeles, typical',
  pull: 'Land is worth what you can build on it, on a date certain. Take away the date and you are buying an opinion.',
  ctaKicker: 'Buying land or a conversion?', cta: 'Price the entitlement *before* you price the dirt.',
  stats: [['12–24', 'Months'], ['CUP', 'Discretionary'], ['0', 'Guarantees']],
  cap: `Zoned for it is not approved for it.

The code tells you what is permitted. The planning counter tells you what is possible. Those are frequently not the same building.

By-right means no public hearing — it does not mean no plan check, and it certainly does not mean no timeline. A conditional use permit is a discretionary decision, and discretion is allowed to say no. Specific plans and overlay districts sit on top of the base zone and quietly rewrite it.

Every month of process is a month of carry somebody is paying for. Price the entitlement risk into the land, or the seller keeps it and you inherit it.

Daniel Hirth · The Hirth Group · 310.300.2838`,
  tags: '#Entitlements #Zoning #CommercialRealEstate #CRE #LandDevelopment #DueDiligence #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #RealEstateStrategy #CommercialProperty #ValueAdd' },

{ id: 'ccarryback', topic: 'Seller Financing', kicker: 'The Brief',
  title: 'A seller carry is a price. *Not a favour.*',
  sub: 'If you are financing the buyer, you are being paid twice — and you should be pricing both.',
  pointsTitle: 'What the carry is actually worth',
  points: [
    ['A note at under market', 'is a discount you gave without saying so.'],
    ['You keep the risk', 'that the bank was going to take off your hands.'],
    ['A larger down payment', 'is the only real protection in the document.'],
    ['Personal guarantees', 'are worth exactly what the guarantor is worth.'],
    ['Gains spread over years', 'is the reason to do it, so do that math first.'],
    ['Price the note and the price', 'as two numbers, then agree on both.']
  ],
  figurePair: ['2', '1'], figurePairLabels: ['numbers being agreed', 'number being discussed'],
  figureLabel: 'The Trade', figureKicker: 'Price and paper are separate',
  pull: 'Every carry-back deal that went wrong went wrong the same way: the parties agreed on a price and treated the paper as a detail.',
  ctaKicker: 'Considering carrying paper?', cta: 'We price the note *and* the building.',
  stats: [['2', 'Numbers'], ['1', 'Document'], ['0', 'Handshakes']],
  cap: `A seller carry is a price, not a favour.

If you are financing your own buyer you are being paid twice — once for the building and once for the money — and you should be pricing both.

A note written under market is a discount you handed over without ever saying the word. You are also keeping the risk a bank was going to take off your hands, so the down payment is the only real protection in the document. A personal guarantee is worth exactly what the guarantor is worth, which is a question, not an answer.

Spreading the gain over several years is a genuinely good reason to do it. Do that math first, then price the note and the building as two separate numbers.

Daniel Hirth · 310.300.2838`,
  tags: '#SellerFinancing #CommercialRealEstate #CRE #DealStructure #InvestmentProperty #CapitalGains #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #RealEstateInvesting #CommercialProperty #DealFlow #TaxDeferred' },

{ id: 'cinsure', topic: 'Insurance', kicker: 'The Brief',
  title: 'Insurance stopped being a line you *copy forward.*',
  sub: 'The number in the seller’s operating statement is the number the seller has. It is not the number you will have.',
  pointsTitle: 'Why the premium moved',
  points: [
    ['Carriers repriced California,', 'and some of them left the state entirely.'],
    ['Replacement cost, not value,', 'is what the premium is actually built on.'],
    ['Roof age and electrical', 'decide whether you are quoted at all.'],
    ['A bound quote in diligence', 'beats a broker’s estimate every time.'],
    ['NNN passes it through,', 'until the tenant renews and prices it in.'],
    ['Underwrite the new premium,', 'not the one on the statement.']
  ],
  figure: 'Year 1', figureSub: 'when the real premium lands', figureLabel: 'The Reset',
  figureKicker: 'Not year five',
  pull: 'The seller’s premium is a fact about the seller. Your premium is a fact about your building, your carrier and this year.',
  ctaKicker: 'Underwriting an acquisition?', cta: 'Get it *bound* before you remove contingencies.',
  stats: [['Yr 1', 'When It Lands'], ['1', 'Bound Quote'], ['0', 'Estimates']],
  cap: `Insurance stopped being a line you copy forward.

The number in the seller's operating statement is the number the seller has. It is not the number you will have, and in California that gap has stopped being small.

Carriers repriced the state and several of them left it. The premium is built on replacement cost, not on what you are paying for the building. Roof age and electrical decide whether you get quoted at all, not just what you get quoted.

Get a bound quote during diligence, not a broker's estimate. On a NNN deal it passes through to the tenant — right up until that tenant renews and prices it in.

Underwrite the premium you are going to pay.

Daniel Hirth · 310.300.2838`,
  tags: '#Insurance #CommercialRealEstate #CRE #Underwriting #DueDiligence #NOI #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #PropertyManagement #CommercialProperty #RealEstateInvesting' },

{ id: 'cvacant', topic: 'Vacancy', kicker: 'The Brief',
  title: 'A vacant building is not a discount. *It is a question.*',
  sub: 'Empty is either the reason to buy it or the reason nobody has. Those look identical from the street.',
  pointsTitle: 'What to establish first',
  points: [
    ['How long it has been empty,', 'and what the last three tenants paid.'],
    ['Why the last one left.', 'The answer is rarely the one you are given.'],
    ['What the space needs', 'to be leasable, in dollars, from a contractor.'],
    ['What comparable space', 'is actually leasing at right now, signed.'],
    ['How long the lease-up takes,', 'and who carries it while it does.'],
    ['Whether an owner-user', 'is the real buyer, because often they are.']
  ],
  figurePair: ['6–12', '0'], figurePairLabels: ['months to lease up', 'income meanwhile'],
  figureLabel: 'The Gap', figureKicker: 'Somebody funds it',
  pull: 'Vacancy is not a discount you are given. It is a job you are taking on, and the discount should be the price of doing it.',
  ctaKicker: 'Looking at an empty building?', cta: 'Price the lease-up, *then* price the building.',
  stats: [['6–12', 'Months'], ['$0', 'Income'], ['1', 'Question']],
  cap: `A vacant building is not a discount. It is a question.

Empty is either the reason to buy it or the reason nobody has, and from the street those two look exactly the same.

So establish the facts first. How long it has been empty. What the last three tenants paid. Why the last one actually left — the answer is rarely the one in the marketing. What the space needs to be leasable, in dollars, from a contractor rather than an estimate. What comparable space is signing at right now.

Then the part everyone skips: how long lease-up takes, and who is carrying it while it happens. That is the number the discount has to cover.

Daniel Hirth · The Hirth Group · 310.300.2838`,
  tags: '#Vacancy #CommercialRealEstate #CRE #ValueAdd #InvestmentProperty #LeaseUp #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #OwnerUser #CommercialProperty #RealEstateInvesting #DealFlow' },

{ id: 'cland', topic: 'Land Value', kicker: 'The Brief',
  title: 'Sometimes you are not buying a building. *You are buying the dirt.*',
  sub: 'When the improvement is worth less than the land under it, the rent roll is a distraction.',
  pointsTitle: 'When land is the deal',
  points: [
    ['Land per square foot', 'is a comp set of its own. Pull it separately.'],
    ['An old improvement', 'can be a demolition cost, not an asset.'],
    ['Density and height', 'decide what the dirt is worth, not what stands on it.'],
    ['A short-term tenant', 'is income while you entitle. A long one is a problem.'],
    ['Corner, frontage, access', 'move land value more than square footage does.'],
    ['Underwrite both ways', 'and let the higher number tell you what it is.']
  ],
  figurePair: ['2', '1'], figurePairLabels: ['ways to value it', 'that is correct'],
  figureLabel: 'Two Models', figureKicker: 'Income and land',
  pull: 'Half the buildings that trade at a bad cap rate were never income deals. The buyer was pricing the parcel and the seller was pricing the rent roll.',
  ctaKicker: 'Not sure which one you own?', cta: 'We run it *both* ways before we price it.',
  stats: [['2', 'Models'], ['1', 'Parcel'], ['LA', 'Market']],
  cap: `Sometimes you are not buying a building. You are buying the dirt.

When the improvement is worth less than the land under it, the rent roll is a distraction — and a surprising number of deals are in exactly that position without anyone saying so out loud.

Land per square foot is its own comp set, so pull it separately. An old improvement can be a demolition cost rather than an asset. Density and height decide what the parcel is worth, not what happens to be standing on it. A short-term tenant is income while you entitle; a long one is an obstacle you paid for.

Underwrite it as income and as land, then let the higher number tell you what you actually own.

Daniel Hirth · 310.300.2838`,
  tags: '#LandValue #CommercialRealEstate #CRE #LandDevelopment #Entitlements #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #ValueAdd #CommercialProperty #RealEstateInvesting #DealFlow' },

{ id: 'cassume', topic: 'Assumption', kicker: 'The Brief',
  title: 'The loan is part of the asset now. *Price it that way.*',
  sub: 'A below-market note with years left on it is worth real money to the right buyer. It is worth nothing if nobody markets it.',
  pointsTitle: 'What makes a loan assumable',
  points: [
    ['Read the note first.', 'Assumable and transferable are different words.'],
    ['Lender approval', 'is a process with a fee and a timeline.'],
    ['The remaining term', 'is what the buyer is really buying.'],
    ['A rate gap of two points', 'is worth more than most price concessions.'],
    ['The gap between price and loan', 'has to be funded by somebody.'],
    ['Market the debt', 'in the offering, not in the third phone call.']
  ],
  figure: '2 pts', figureSub: 'below today, on real money', figureLabel: 'The Spread',
  figureKicker: 'What it is worth',
  pull: 'Assumable debt is the only part of a deal that got more valuable while everything else got harder, and it is still buried on page nine.',
  ctaKicker: 'Have debt worth assuming?', cta: 'It belongs on page one, *not* page nine.',
  stats: [['2 pts', 'Rate Gap'], ['1', 'Note'], ['0', 'Buried']],
  cap: `The loan is part of the asset now. Price it that way.

A below-market note with years left on it is worth real money to the right buyer — and worth nothing at all if nobody markets it.

Start by reading the note, because assumable and transferable are not the same word. Lender approval is a process with a fee and a timeline attached. The remaining term is what the buyer is genuinely buying, and a two-point gap to today's rate is worth more than most price concessions anyone is arguing about.

The gap between the price and the loan balance has to be funded by somebody, so establish that early.

Then put the debt on page one of the offering instead of page nine.

Daniel Hirth · The Hirth Group · 310.300.2838`,
  tags: '#AssumableDebt #CommercialRealEstate #CRE #DealStructure #Financing #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #CapRate #CommercialProperty #RealEstateInvesting #DealFlow' },

{ id: 'cphase1', topic: 'Environmental', kicker: 'The Brief',
  title: 'The Phase I is not a formality. *It is a decision.*',
  sub: 'Nobody reads it until the lender does, and by then it is a reason to reprice rather than a reason to plan.',
  pointsTitle: 'What it is actually for',
  points: [
    ['A recognised condition', 'is a finding, not an accusation. Read what it says.'],
    ['Dry cleaners and auto uses', 'are the two histories that change deals.'],
    ['Order it early,', 'because a Phase II adds weeks you do not have.'],
    ['The lender will require it', 'regardless of what you decide about it.'],
    ['Innocent landowner defence', 'is the reason the report exists at all.'],
    ['A clean report is leverage', 'when you are the one selling.']
  ],
  figurePair: ['2–3', '4–8'], figurePairLabels: ['weeks, Phase I', 'weeks, Phase II'],
  figureLabel: 'The Clock', figureKicker: 'If it escalates',
  pull: 'Environmental almost never kills a deal. It kills timelines, and a dead timeline kills the deal.',
  ctaKicker: 'Opening escrow soon?', cta: 'Order it in week one, *not* week five.',
  stats: [['2–3', 'Weeks, Ph. I'], ['4–8', 'Weeks, Ph. II'], ['1', 'Report']],
  cap: `The Phase I is not a formality. It is a decision.

Nobody reads it until the lender does, and by then it has become a reason to reprice rather than a reason to plan.

A recognised environmental condition is a finding, not an accusation — read what it actually says. Dry cleaners and automotive uses are the two site histories that genuinely change deals. Order the report in week one, because if it escalates to a Phase II you are adding weeks you did not budget.

The lender will require it either way. And if you are the seller, a clean report is leverage, not paperwork.

Daniel Hirth · 310.300.2838`,
  tags: '#Environmental #PhaseI #CommercialRealEstate #CRE #DueDiligence #Escrow #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #CommercialProperty #RealEstateTips #DealFlow' },
];

/* ══════════════════════════════════════════════════════════════════════════
   LISTINGS
   ══════════════════════════════════════════════════════════════════════════ */
const LISTINGS = [
{ id: 'olive', photo: 'olive', kind: 'Just Listed', title: '2221 – 2225 Olive Avenue',
  addr: '2221 – 2225 Olive Avenue', city: 'Burbank, CA 91506',
  cityline: 'Burbank · Media District', price: '$3,750,000', useShort: 'Mixed-Use · 18 Units',
  stats: [['$3.75M', 'Offered At'], ['18', 'Units'], ['±7,478', 'Building SF'], ['±10,100', 'Lot SF'], ['6.53%', 'Current Cap']],
  highlights: [
    ['Three income streams', 'at one address: retail, office and apartments.'],
    ['18 units', 'on a corner of West Olive Avenue.'],
    ['±7,478 SF of building', 'on a ±10,100 SF lot.'],
    ['6.53% current cap,', '7.77% on the pro forma.'],
    ['Burbank Media District,', 'walking distance to the studios.'],
    ['Value-add on rents', 'as the existing leases roll.']
  ],
  markers: [['Warner Bros', '±1.5mi'], ['Downtown Burbank', '±1mi'], ['I-5', '±1.5mi'], ['Bob Hope Apt', '±2mi']],
  cap: `Just Listed | 2221 – 2225 Olive Avenue, Burbank

18 units on one corner of W Olive Avenue — retail storefronts, office suites and apartments. ±7,478 SF of building on a ±10,100 SF lot. 6.53% current cap, 7.77% pro forma.

Three income streams at one address, in the middle of Burbank's Media District.

Ethan Donel · Alex Reyhan · Daniel Hirth
Call or text 310.300.2838, or DM for the OM.`,
  tags: '#JustListed #CommercialRealEstate #CRE #BurbankCA #MixedUse #MediaDistrict #InvestmentProperty #LosAngelesRealEstate #SanFernandoValley #CapRate #MultiTenant #1031Exchange #RealEstateInvesting #CREBroker #HirthGroup #KWCommercial #RetailRealEstate #PassiveIncome #LARealEstate #ValueAdd' },

{ id: 'saviers', photo: 'saviers', kind: 'Just Closed', title: '1177 Saviers Road', closed: true,
  addr: '1177 Saviers Road', city: 'Oxnard, CA 93033',
  cityline: 'Oxnard · Ventura County', price: '$1,200,000', useShort: 'Car Dealership',
  stats: [['$1.2M', 'Sale Price'], ['±3,034', 'Building SF'], ['±24,829', 'Lot SF'], ['C2', 'Zoning']],
  highlights: [
    ['Represented both sides', '— the seller and the buyer.'],
    ['±3,034 SF building', 'on a ±24,829 SF C2 lot.'],
    ['Closed at $1,200,000', 'in Oxnard, Ventura County.'],
    ['Automotive use', 'with a full display lot.'],
    ['Owner-user buyer', 'sourced off market.'],
    ['Selling something similar?', 'We hold the buyer list.']
  ],
  markers: [['US-101', '±2mi'], ['Oxnard College', '±1.5mi'], ['Port Hueneme', '±3mi'], ['Downtown', '±2mi']],
  cap: `Just Closed | 1177 Saviers Road, Oxnard

The Hirth Group represented both seller and buyer on this ±3,034 SF car dealership on a ±24,829 SF C2 lot. Closed at $1,200,000.

Buying or selling automotive / commercial property? Call or text 310.300.2838.`,
  tags: '#JustClosed #CommercialRealEstate #CRE #Oxnard #CarDealership #Automotive #RepresentedBuyerAndSeller #HirthGroup #CREBroker #KWCommercial #CommercialProperty #SoldByHirth #1031Exchange #VenturaCounty #SoldInLA' }
];

/* ══════════════════════════════════════════════════════════════════════════
   LINKEDIN — twenty-one pieces, seven a week, three weeks before repeat
   ══════════════════════════════════════════════════════════════════════════ */
const LI_TAGS = '#CommercialRealEstate #CRE #LosAngeles #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LARealEstate';

/* Every LinkedIn piece was falling back to the same five generic tags, which
   is the first-comment equivalent of saying nothing. Keyed to the topic
   instead — the house tags plus the ones the piece is actually about. */
const LI_HOUSE = ' #CommercialRealEstate #CRE #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #InvestmentProperty';
const LI_TAGS_BY_TOPIC = {
  'Underwriting': '#Underwriting #CapRate #NOI #DueDiligence #ValueAdd',
  'Pricing': '#PropertyValuation #SellCommercial #ListingStrategy #BrokerOpinionOfValue #ThinkingOfSelling',
  '1031 Exchange': '#1031Exchange #TaxDeferred #CapitalGains #NetLease #RealEstateInvesting',
  'Deal Flow': '#OffMarket #DealFlow #PocketListing #SanFernandoValley #BuyerRepresentation',
  'Due Diligence': '#DueDiligence #RentRoll #Estoppel #LeaseAudit #Escrow',
  'Net Lease': '#NetLease #NNN #CreditTenant #PassiveIncome #CapRate',
  'The Business': '#RealEstateInvesting #DealFlow #CommercialProperty #BrokerLife #MarketInsight',
  'Property Tax': '#PropertyTax #Prop13 #Underwriting #NOI #CaliforniaRealEstate',
  'Days on Market': '#DaysOnMarket #ListingStrategy #SellCommercial #PropertyValuation #ThinkingOfSelling',
  'Debt': '#Refinance #DebtMaturity #CapitalMarkets #RealEstateStrategy #SellCommercial',
  'Valuation': '#BrokerOpinionOfValue #PropertyValuation #Appraisal #SellCommercial #RealEstateStrategy',
  'Leasing': '#CommercialLeasing #CreditTenant #NNN #LeaseAudit #DueDiligence',
  'Structure': '#SellerFinancing #Carryback #DealStructure #CapitalMarkets #RealEstateInvesting',
  'Capital': '#CapEx #DueDiligence #PropertyManagement #ValueAdd #BuildingInspection',
  'Transfer Tax': '#MeasureULA #TransferTax #SellCommercial #PropertyTax #RealEstateStrategy',
  'Negotiation': '#Negotiation #DealStructure #Escrow #SellCommercial #BuyerRepresentation',
  'Submarkets': '#IndustrialRealEstate #SanFernandoValley #Submarket #Absorption #ValueAdd',
  'Owner-Users': '#OwnerUser #SBA #IndustrialRealEstate #SellCommercial #CommercialProperty',
  'Process': '#Escrow #DueDiligence #TransactionManagement #SellCommercial #RealEstateStrategy'
};
function liTags(topic) {
  return (LI_TAGS_BY_TOPIC[topic] || '#RealEstateInvesting #CommercialProperty #DealFlow') + LI_HOUSE;
}
const LINKEDIN = [
{ topic: 'Underwriting', title: 'The cap rate on the flyer is not the cap rate',
  body: `A broker sends you a 6.5% cap. You run it yourself and get 5.1%.

Neither of you is lying. You are just counting differently.

The flyer usually uses scheduled rent, not collected. It leaves out vacancy. It uses last year's taxes instead of what the county will reassess to on sale. Management is listed at 3% when nobody in this market manages a twelve-unit for 3%.

None of that is fraud. It is convention.

The number that matters is the one after: actual collections, real vacancy, reassessed taxes, and what it truly costs to run the thing.

On the deals we underwrite in LA, that spread is usually 80 to 150 basis points.

Ask for the trailing twelve. Not the pro forma. If the seller will not produce it, you have learned something about the deal.` },

{ topic: 'Pricing', title: 'What holding out actually costs',
  body: `A seller wanted $2.6M. The market said $2.4M.

He waited fourteen months for his number.

He got $2.45M.

On paper he beat the offer by $50,000. In reality:

— 14 months of carry, taxes and insurance
— A vacancy he covered the whole time
— A rate environment that moved against him

He did not lose because he was greedy. He lost because nobody sat down and put the cost of waiting on the same page as the price.

That is the conversation worth having before you list, not after.

Every seller has a number. Fine. Just know what the number costs to defend.` },

{ topic: '1031 Exchange', title: '45 and 180',
  body: `Those are the two numbers that decide whether your 1031 works.

45 days from the close of your sale to identify the replacement property, in writing. 180 days to close on it. Weekends and holidays count. Day 46 is not day 45.

Here is what actually goes wrong: people sell first and shop second.

Now you are 45 days out with a gun to your head, and every seller in the market can smell it. You overpay, or you blow the exchange and hand over the capital gains you were trying to defer.

The version that works looks boring. You line up replacement candidates before the sale closes. You have a backup. You know your qualified intermediary before escrow opens, not during it.

The exchange is not the hard part. The calendar is.` },

{ topic: 'Deal Flow', title: 'The good deals are gone before they are listed',
  body: `By the time a property hits the platforms, forty people have already passed on it. That is not a conspiracy. It is just how it moves.

An owner mentions to somebody that they are tired. No listing, no sign. A broker who knows a specific buyer picks up the phone. It trades in three weeks.

You never saw it because there was nothing to see.

You do not get on that call by refreshing listing alerts. You get on it by being specific and being reachable.

"Industrial, San Fernando Valley, 5 to 15 thousand feet, can close in 30 days" gets a phone call.

"Looking for good opportunities in LA" gets nothing, because it tells me nothing.

Say the specific thing. Out loud. To people who see deals.` },

{ topic: 'Due Diligence', title: 'Read the rent roll before the offering memorandum',
  body: `The OM is marketing. Beautiful photos, a strong narrative, a stabilised pro forma. It is written to be believed.

The rent roll is written to be filed. That is the difference.

The rent roll tells you which tenants are actually paying and which are simply listed. How many leases roll in the next eighteen months. Whether the rents are market or a favour somebody did for a friend. What concessions and free rent got averaged into a number that looks clean.

None of that shows up in a rendering.

I am not saying ignore the OM. I am saying read it second.

Ask for the rent roll and the trailing twelve on day one. How fast they come back is its own piece of information.` },

{ topic: 'Net Lease', title: 'A 4.25% cap is not expensive. It is a different product.',
  body: `Every time a brand-new NNN deal prices in the low fours, somebody tells me the buyer overpaid.

They are comparing two things that are not the same thing.

A 15-year absolute net lease to a credit tenant, with scheduled increases and zero landlord responsibilities, is not real estate operating income. It is closer to a bond that happens to sit on a hard corner.

You are not buying upside. You are buying certainty, financeability, and never taking a call about a roof.

The value-add deal at an 8 is a job. Sometimes a very good one. But it is a job.

Neither is wrong. They are answers to different questions.

The mistake is buying the 4.25 expecting the 8's returns, or buying the 8 expecting the 4.25's Tuesdays.` },

{ topic: 'The Business', title: 'Everyone sees the same listings',
  body: `Access is not the edge anymore.

Every listing is on every platform within the hour. Your buyer has already seen it. So has everyone else's.

The edge is knowing which one pencils.

Which submarket is actually absorbing space and which one just has a nice narrative. Which seller is motivated and which is fishing. What the last three comparable deals really traded at, not what they were asking.

That is not information you can subscribe to.

It comes from having done nearly two hundred of these, and from paying attention on the ones you lost.

If you are looking at something in Los Angeles and want an honest read on whether it works — that conversation costs nothing.` },

{ topic: 'Property Tax', title: 'The seller’s tax bill is not your tax bill',
  body: `A building held for thirty years carries a thirty-year-old assessment.

Change of ownership generally resets that to market value. In practice: roughly what you just paid.

The pro forma you were handed usually still shows the old number. Which means the NOI you underwrote is not the NOI you are going to run.

This does not show up in year five. It shows up in year one.

It is the single most common modelling error I see on long-held LA assets, and it is entirely avoidable — you can look up the current assessed value in about four minutes.

Underwrite the reset, not the current bill.

Not tax advice. Ask your CPA about your specific facts.` },

{ topic: 'Days on Market', title: 'Nobody buys the third price cut',
  body: `Overprice by ten percent and you do not lose ten percent.

You lose the first three weeks.

That is when the ready buyers look — the ones with money, a mandate and a deadline. Priced high, they skip it. They do not come back when you adjust, because they already spent the attention.

Cut one reads as an adjustment. Cut two reads as a problem. Cut three reads as distress.

And distress attracts exactly the offer you did not want.

Day count is public. Every broker checks it before they call you.

The price cut does not buy the first three weeks back. Nothing does.` },

{ topic: 'Debt', title: 'The maturity date is the real deadline',
  body: `Most owners do not sell because they decided to.

They sell because a loan is coming due and the refinance does not work at today's rates.

If that is you in the next two years, start now.

Model the refinance at the rate you would actually get, not the one you signed at. If it does not cover, you have a decision to make. Twenty-four months out, that decision is: sell into a normal market, recapitalise, or bring money in.

Six months out, it is not a decision. It is an emergency, and the market can read the clock as well as you can.

A seller with two years is negotiating. A seller with two months is being negotiated with.` },

{ topic: 'Valuation', title: 'Appraisal vs broker opinion',
  body: `An appraisal tells you what it was worth. A broker tells you what it will trade for.

Both are honest. They answer questions asked at different times.

An appraisal looks backward at closed comparables. Closed comps lag the market by three to six months, because that is how long a deal takes to get from agreement to recording.

A broker opinion looks forward at the buyers circling right now and what they will actually do this quarter.

When rates are moving, those two numbers can be a long way apart. Neither party is wrong.

Your lender needs the appraisal. You need the other one before you decide what to ask.` },

{ topic: 'Leasing', title: 'Ten years from a weak tenant is not ten years',
  body: `Term is only worth what the covenant behind it is worth.

Who actually signed the lease — the operating entity, or a shell formed for this location? Is there a guarantee? Does the guarantor have anything?

Franchisee or corporate? The sign out front does not tell you, and the difference is enormous.

Then the softer signals, which are better predictors than people expect: how long they have been in occupancy, what they spent building the space out, and rent as a share of their sales.

A tenant who put half a million into a build-out is a tenant who renews.

The term is the promise. The covenant is whether the promise is collectable.` },

{ topic: 'Structure', title: 'Seller financing is a pricing tool',
  body: `When debt is expensive, the seller who will carry paper is the seller who gets their number.

Sometimes more than their number — because price and terms are the same conversation, and most sellers only negotiate one of them.

A carryback widens the pool to buyers the banks are currently declining for reasons that have nothing to do with the building. It keeps the seller earning a yield instead of parking proceeds at nothing. It can spread the gain across the years the payments arrive.

It is not for everyone. If you need all the cash on day one, it is the wrong tool.

If you do it: get the security right. Position, personal guarantee, real remedies, properly papered.

Talk to your CPA and your counsel about your facts.` },

{ topic: 'Capital', title: 'Deferred maintenance is a price, not a surprise',
  body: `Every building has a capital number attached to it.

The only question is whether it shows up in your offer or in your second year of ownership.

Roof age and remaining life, in writing, from somebody who actually got on it. HVAC age against what replacement costs today, not what it cost when the unit went in. Electrical capacity against what a modern tenant will ask for. Sewer laterals, which nobody inspects until they fail.

Then the ones that get triggered by permits rather than by choice: ADA, life safety, seismic where it applies.

You are buying the capital plan either way.

Price it, or pay for it twice.` },

{ topic: 'Transfer Tax', title: 'In the City of LA, transfer tax is part of the price',
  body: `Measure ULA applies to commercial property, not only to homes.

It is charged on the sale price. Not the gain, not the equity, not the profit. Thresholds are adjusted annually, so check the current ones rather than the number you remember from the ballot.

The practical effect is simple: sellers do not price off the headline number, they price off the wire. If the transfer tax is not in the model before you set an ask, the ask is a guess.

One thing worth checking on day one: whether the parcel is actually inside city limits. That line, not the postcode, is what decides whether any of this applies.

Not tax or legal advice.` },

{ topic: 'Due Diligence', title: 'The estoppel is where the story stops matching the file',
  body: `The seller tells you what the lease says. The tenant signs what they believe the lease to be.

When those two documents disagree, you have found the actual deal.

Estoppels confirm the rent actually being paid and the date it was last paid. The term and the options the tenant believes they hold. Deposits. Side agreements that never made it into the lease file. Outstanding landlord obligations you are about to inherit.

Collect them from every tenant. Not just the easy ones.

A tenant who will not sign an estoppel is telling you something the rent roll was never going to.` },

{ topic: 'Negotiation', title: 'Price is one term',
  body: `Sellers fixate on price because it is the number that gets repeated at dinner.

Buyers who understand that win deals without paying the most.

Deposit size and when it goes hard. Length of the diligence period. Whether the close is financed or not. Who carries which closing cost. A leaseback that lets an owner-user stay put for six months while they finish their new space.

I have watched a seller take $150,000 less because the buyer could close in 21 days and waive a contingency the other party would not.

That is not the seller being irrational. Certainty has a price, and it is often larger than the gap you are arguing about.

Negotiate the whole deal, not one line of it.` },

{ topic: 'Submarkets', title: 'The submarket is not the city',
  body: `"LA industrial is strong" is not a fact you can act on.

Two parcels four miles apart can be in different worlds — different absorption, different tenant depth, different rent trajectory, different buyer pool entirely.

What actually matters at parcel level: clear height, power, truck access, yard, and whether the streets around it can take the traffic your tenant needs.

A 20,000 SF building with 14-foot clear and no yard is not competing with a 20,000 SF building with 24-foot clear and a fenced yard. They are different products at different rents to different tenants.

Averages are for headlines. Deals happen at the parcel.` },

{ topic: 'The Business', title: 'The deal you walk away from',
  body: `The best transaction I was part of last year was one we did not do.

We had a buyer under contract, in diligence, emotionally committed. The seller's story on the roof did not survive a real inspection, and the number to fix it landed at roughly a year of NOI.

We could have argued for a credit and pushed it through. Everyone would have been paid.

We told them to walk.

Six weeks later they bought something better, at a price that made sense, with a roof that had eleven years left on it.

You get paid for the deals you close. You get referred for the ones you stopped.` },

{ topic: 'Owner-Users', title: 'Owner-users are quietly the strongest buyers right now',
  body: `An investor buys a building for its yield. Every basis point of rate movement changes what they can pay.

An owner-user buys it because their lease is up and moving twice would cost more than the difference.

That buyer is comparing a mortgage payment to a rent cheque, not to a cap rate. They will pay above where an investor stops, and they are not shopping the same set of comparables.

If you are selling something in the 3,000 to 15,000 square foot range with usable clear height and any kind of yard, the owner-user pool deserves to be worked directly — not just posted at and hoped for.

That is a phone list, not a marketing campaign.` },

{ topic: 'Process', title: 'A quiet escrow is a designed escrow',
  body: `Deals rarely die from one big problem.

They die from six small ones that all surface in the last ten days, when everybody is tired and nobody has slack left.

The fix is boring and it works. Title pulled the week the contract is signed, not the week before close. Estoppels going out on day two. Loan application in before diligence ends. A written weekly call with every party on it, including the ones who think they do not need to be.

None of that is clever. It is just done early, on purpose.

If your escrow is quiet, somebody upstream did their job. If it is loud in the last week, somebody did not.` }
];
