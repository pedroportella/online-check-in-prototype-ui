import { useMemo, useState } from 'react';
import { faCalendar, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Accordion, Button, Card, CheckboxGroup, Layout, RadioGroup, SelectInput } from '@va/ui-library';
import { formatNumber } from '@va/utils';

type JourneyStage = 'identity' | 'bags' | 'seats' | 'docs' | 'boardingPass';
type Workstream = 'vendor' | 'offshore' | 'security' | 'release';

const releaseOptions = [
  { label: 'September go-live readiness', value: 'sept' },
  { label: 'Vendor code quality sweep', value: 'quality' },
  { label: 'Offshore build governance', value: 'offshore' }
];

const stageLabels: Record<JourneyStage, string> = {
  identity: 'Identity', bags: 'Bags', seats: 'Seats', docs: 'Travel docs', boardingPass: 'Boarding pass'
};
const workstreamLabels: Record<Workstream, string> = {
  vendor: 'Vendor QA', offshore: 'Offshore build', security: 'Security gates', release: 'Release readiness'
};

const flights = [
  { id: 'VA938', route: 'BNE to SYD', departure: '08:05', status: 'Ready', checkedIn: 142, exceptions: 7 },
  { id: 'VA322', route: 'MEL to BNE', departure: '09:20', status: 'Watch', checkedIn: 118, exceptions: 15 },
  { id: 'VA476', route: 'PER to ADL', departure: '10:10', status: 'Ready', checkedIn: 96, exceptions: 4 }
];

export function App() {
  const [releaseFocus, setReleaseFocus] = useState('sept');
  const [activeStages, setActiveStages] = useState<JourneyStage[]>(['identity', 'bags', 'docs', 'boardingPass']);
  const [workstream, setWorkstream] = useState<Workstream>('vendor');
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const stageOptions = (Object.keys(stageLabels) as JourneyStage[]).map((stage) => ({ id: stage, label: stageLabels[stage], value: stage, checked: activeStages.includes(stage) }));
  const riskCount = useMemo(() => flights.reduce((total, flight) => total + flight.exceptions, 0), []);

  return (
    <Layout
      header={{ title: 'Virgin Australia Online Check-in', baseUrl, items: [
        { label: 'Pedro Portella', href: '/profile', icon: faUser },
        { label: 'Roster', href: '/roster', icon: faCalendar },
        { label: 'Sign out', href: '/sign-out', icon: faRightFromBracket }
      ] }}
      hideSidebar
    >
      <>
        <section className="dcir__page-header qld__body--dark">
          <div className="container-fluid">
            <div className="row qld__row-gap-component">
              <div className="col-xs-12 col-md-9">
                <h1 className="dcir__page-header--title">Online check-in delivery cockpit</h1>
                <p className="dcir__page-header--description">Lead-facing prototype for governing vendor quality, offshore delivery, AI-assisted checks and operational readiness before September go-live.</p>
              </div>
              <div className="col-xs-12 col-md-3">
                <Button variant="secondary" href="#journey-board">Review flights</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="dcir__page-content">
          <div className="container-fluid">
            <div className="row qld__row-gap-component qld__card-list--matchheight" aria-label="Delivery KPIs">
              <div className="col-xs-12 col-sm-6 col-xl-3">
                <Card variant="no-action" title="Check-in completion" description="87.4%" />
              </div>
              <div className="col-xs-12 col-sm-6 col-xl-3">
                <Card variant="no-action" title="Vendor defects open" description="23" />
              </div>
              <div className="col-xs-12 col-sm-6 col-xl-3">
                <Card variant="no-action" title="AI review coverage" description="64 PRs" />
              </div>
              <div className="col-xs-12 col-sm-6 col-xl-3">
                <Card variant="no-action" title="Passenger exceptions" description={formatNumber(riskCount)} />
              </div>
            </div>
            <div className="row qld__row-gap-component">
              <div className="col-xs-12 col-xl-4 qld__display-flex qld__flex-column qld__row-gap-component">
                <Accordion defaultOpenAll showToggleAll={false} items={[{ id:'delivery-controls', title:'Delivery controls', body:(
                  <div className="qld__display-flex qld__flex-column qld__row-gap-component">
                    <SelectInput id="release-focus" label="Focus" value={releaseFocus} onChange={(value)=>setReleaseFocus(String(value))} options={releaseOptions} hint="Switch the operating view without changing the journey baseline." />
                    <RadioGroup id="workstream" legend="Lead workstream" name="workstream" selectedValue={workstream} onChange={(value)=>setWorkstream(value as Workstream)} options={(Object.keys(workstreamLabels) as Workstream[]).map((key)=>({ id:key, label:workstreamLabels[key], value:key }))} />
                    <CheckboxGroup id="journey-stages" legend="Journey stages" name="journey-stages" options={stageOptions} onChange={(value, checked)=>setActiveStages((current)=>checked ? [...new Set([...current, value as JourneyStage])] : current.filter((item)=>item!==value))} />
                  </div>
                )}]} />
                <Card variant="no-action" title="Lead note" description="Use AI-assisted PR summaries to triage risky vendor changes, then route high-risk items through accessibility, security and release gates." />
              </div>
              <div className="col-xs-12 col-xl-8">
                <section id="journey-board" aria-label="Online check-in journey board">
                  <div className="row qld__row-gap-component qld__card-list--matchheight">
                    {activeStages.map((stage)=>(
                      <div className="col-xs-12 col-md-6 col-xl-4" key={stage}>
                        <Card variant="no-action" title={stageLabels[stage]} description={stage === 'boardingPass' ? '99.1%' : stage === 'docs' ? '92.8%' : 'Green'} />
                      </div>
                    ))}
                  </div>
                  <div className="row qld__row-gap-component qld__card-list--matchheight">
                    {flights.map((flight)=>(
                      <div className="col-xs-12" key={flight.id}>
                        <Card variant="no-action" title={`${flight.id}: ${flight.route} at ${flight.departure}`} description={`${flight.status}. ${flight.checkedIn} checked in. ${flight.exceptions} exceptions.`} />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}
