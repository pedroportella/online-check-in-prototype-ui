import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { faCalendar, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Accordion, Button, Card, CheckboxGroup, Layout, RadioGroup, SelectInput } from '@va/ui-library';
import {
  getCheckInDashboard,
  type CheckInDashboard,
  type CheckInStage,
  type HeaderIcon,
  type Workstream
} from '@va/services-check-in';

const headerIcons = {
  calendar: faCalendar,
  signOut: faRightFromBracket,
  user: faUser
} satisfies Record<HeaderIcon, typeof faUser>;

type DashboardState =
  | { status: 'loading'; data?: undefined; error?: undefined }
  | { status: 'ready'; data: CheckInDashboard; error?: undefined }
  | { status: 'error'; data?: undefined; error: string };

const getStageKeys = (dashboard: CheckInDashboard) => Object.keys(dashboard.stageLabels) as CheckInStage[];
const getWorkstreamKeys = (dashboard: CheckInDashboard) => Object.keys(dashboard.workstreamLabels) as Workstream[];

const getFlightDescription = (flight: CheckInDashboard['flights'][number]) =>
  `${flight.status}. ${flight.checkedIn} checked in. ${flight.exceptions} exceptions.`;

const getFlightTitle = (flight: CheckInDashboard['flights'][number]) =>
  `${flight.id}: ${flight.route} at ${flight.departure}`;

const toHeaderItems = (dashboard: CheckInDashboard) =>
  dashboard.header.items.map((item) => ({
    ...item,
    icon: headerIcons[item.icon]
  }));

const initialiseDashboardState = (dashboard: CheckInDashboard) => ({
  releaseFocus: dashboard.defaultReleaseFocus,
  activeStages: dashboard.defaultActiveStages,
  workstream: dashboard.defaultWorkstream
});

type DashboardUiState = ReturnType<typeof initialiseDashboardState>;

const setDashboardUiDefaults = (
  dashboard: CheckInDashboard,
  setUiState: Dispatch<SetStateAction<DashboardUiState | null>>
) => {
  setUiState((current) => current ?? initialiseDashboardState(dashboard));
};

export function App() {
  const [dashboardState, setDashboardState] = useState<DashboardState>({ status: 'loading' });
  const [uiState, setUiState] = useState<DashboardUiState | null>(null);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    let mounted = true;

    getCheckInDashboard()
      .then((dashboard) => {
        if (!mounted) return;
        setDashboardState({ status: 'ready', data: dashboard });
        setDashboardUiDefaults(dashboard, setUiState);
      })
      .catch((error: unknown) => {
        if (!mounted) return;
        setDashboardState({
          status: 'error',
          error: error instanceof Error ? error.message : 'Unable to load check-in dashboard.'
        });
      });

    return () => {
      mounted = false;
    };
  }, []);

  const dashboard = dashboardState.status === 'ready' ? dashboardState.data : undefined;
  const header = dashboard
    ? { title: dashboard.header.title, baseUrl, items: toHeaderItems(dashboard) }
    : { title: 'Virgin Australia Online Check-in', baseUrl, items: [] };

  return (
    <Layout
      header={header}
      hideSidebar
    >
      <>
        {dashboardState.status === 'loading' && (
          <section className="dcir__page-content" aria-live="polite">
            <div className="container-fluid">
              <Card variant="no-action" title="Loading check-in dashboard" description="Connecting to online-check-in-prototype-services." />
            </div>
          </section>
        )}

        {dashboardState.status === 'error' && (
          <section className="dcir__page-content" role="alert">
            <div className="container-fluid">
              <Card variant="no-action" title="Check-in service unavailable" description={dashboardState.error} />
            </div>
          </section>
        )}

        {dashboard && uiState && (
          <>
            <section className="dcir__page-header qld__body--dark">
              <div className="container-fluid">
                <div className="row qld__row-gap-component">
                  <div className="col-xs-12 col-md-9">
                    <h1 className="dcir__page-header--title">{dashboard.pageHeader.title}</h1>
                    <p className="dcir__page-header--description">{dashboard.pageHeader.description}</p>
                  </div>
                  <div className="col-xs-12 col-md-3">
                    <Button variant="secondary" href={dashboard.pageHeader.primaryAction.href}>
                      {dashboard.pageHeader.primaryAction.label}
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            <section className="dcir__page-content">
              <div className="container-fluid">
                <div className="row qld__row-gap-component qld__card-list--matchheight" aria-label="Delivery KPIs">
                  {dashboard.kpiCards.map((kpi) => (
                    <div className="col-xs-12 col-sm-6 col-xl-3" key={kpi.label}>
                      <Card variant="no-action" title={kpi.label} description={kpi.value} />
                    </div>
                  ))}
                </div>
                <div className="row qld__row-gap-component">
                  <div className="col-xs-12 col-xl-4 qld__display-flex qld__flex-column qld__row-gap-component">
                    <Accordion defaultOpenAll showToggleAll={false} items={[{ id:'delivery-controls', title: dashboard.controlsTitle, body:(
                      <div className="qld__display-flex qld__flex-column qld__row-gap-component">
                        <SelectInput id="release-focus" label={dashboard.releaseFocusLabel} value={uiState.releaseFocus} onChange={(value)=>setUiState((current)=>current ? { ...current, releaseFocus: String(value) } : current)} options={dashboard.releaseOptions} hint={dashboard.releaseFocusHint} />
                        <RadioGroup id="workstream" legend={dashboard.workstreamLegend} name="workstream" selectedValue={uiState.workstream} onChange={(value)=>setUiState((current)=>current ? { ...current, workstream: value as Workstream } : current)} options={getWorkstreamKeys(dashboard).map((key)=>({ id:key, label:dashboard.workstreamLabels[key], value:key }))} />
                        <CheckboxGroup id="journey-stages" legend={dashboard.journeyStagesLegend} name="journey-stages" options={getStageKeys(dashboard).map((stage) => ({ id: stage, label: dashboard.stageLabels[stage], value: stage, checked: uiState.activeStages.includes(stage) }))} onChange={(value, checked)=>setUiState((current)=>current ? { ...current, activeStages: checked ? [...new Set([...current.activeStages, value as CheckInStage])] : current.activeStages.filter((item)=>item!==value) } : current)} />
                      </div>
                    )}]} />
                    <Card variant="no-action" title={dashboard.leadNoteTitle} description={dashboard.leadNote} />
                  </div>
                  <div className="col-xs-12 col-xl-8">
                    <section id="journey-board" aria-label="Online check-in journey board">
                      <div className="row qld__row-gap-component qld__card-list--matchheight">
                        {uiState.activeStages.map((stage)=>(
                          <div className="col-xs-12 col-md-6 col-xl-4" key={stage}>
                            <Card variant="no-action" title={dashboard.stageLabels[stage]} description={dashboard.stageSummaries[stage]} />
                          </div>
                        ))}
                      </div>
                      <div className="row qld__row-gap-component qld__card-list--matchheight">
                        {dashboard.flights.map((flight)=>(
                          <div className="col-xs-12" key={flight.id}>
                            <Card variant="no-action" title={getFlightTitle(flight)} description={getFlightDescription(flight)} />
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </>
    </Layout>
  );
}
