import React, { Component } from 'react';
import { httpClient, COGNOS_SOURCE } from '../../constants';
import { dashSpec } from './new-dash-spec';
import defaultGraph from "../../img/default-graph.png";
var roomId;
class DashboardMain extends Component {
    sessionObj = null;
    cognosApi = null;
    expTime = null;
    dashSpec = {};
    constructor(props) {
        super(props);
        this.state = {
            window: undefined,
            source: COGNOS_SOURCE
        }
    }
    componentDidMount() {
        this.sessionCode = localStorage.getItem("sessionCode");
        this.expTime = localStorage.getItem("expTime");
        setTimeout(() => {
            this.setState({
                window: window,
            }, () => {
                this.checkDashboardSession();
            });
        }, 2000);
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.selectedRoomId !== prevState.selectedRoomId) {
            return {
                selectedRoomId: nextProps.selectedRoomId
            }
        }
        return null
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedRoomId !== this.props.selectedRoomId) {
            this.checkDashboardSession();
        }
    }

    checkDashboardSession = () => {
        if (this.sessionCode && Number(this.expTime) > new Date().getTime()) {
            this.initializeCognosApi();
        } else {
            this.getDashBoardSession();
        }
    }

    initializeCognosApi = () => {
        this.sessionObj = null;
        this.cognosApi = null;
        // if (this.props.selectedRoomId) {
        if (this.state.window && this.state.window.CognosApi) {
            let window = this.state.window;
            this.cognosApi = new window.CognosApi({
                cognosRootURL:
                    "https://us-south.dynamic-dashboard-embedded.cloud.ibm.com/daas/",
                sessionCode: this.sessionCode,
                node: document.getElementById("dash")
            });
            let dashSpecObj = JSON.parse(JSON.stringify({ ...dashSpec }));
            // if (dashSpecObj.pageContext && dashSpecObj.pageContext.length > 0) {
            //     dashSpecObj.pageContext[0].tupleSet = {
            //         ["CALL_TONE.ROOM_ID->[" + this.props.selectedRoomId + "]"]: {
            //             "u": "CALL_TONE.ROOM_ID->[" + this.props.selectedRoomId + "]",
            //             "d": this.props.selectedRoomId
            //         }
            //     }
            // };
            dashSpecObj.dataSources.sources.forEach(element => {
                element.module.source = { ...this.state.source }
            });


            if (!this.props.selectedRoomId) {
                let tabs = [...dashSpecObj.layout.items]
                tabs.pop();
                dashSpecObj.layout.items = [...tabs];
            }

            Object.keys(dashSpecObj.widgets).forEach(widgetKey => {
                if (dashSpecObj.widgets[widgetKey].localFilters && dashSpecObj.widgets[widgetKey].localFilters.length > 0 && dashSpecObj.widgets[widgetKey].localFilters[0].values && dashSpecObj.widgets[widgetKey].localFilters[0].values.length > 0) {
                    dashSpecObj.widgets[widgetKey].localFilters[0].values[0].d = this.props.selectedRoomId
                    if (dashSpecObj.widgets[widgetKey].localFilters[0].values[0].u) {
                        dashSpecObj.widgets[widgetKey].localFilters[0].values[0].u = dashSpecObj.widgets[widgetKey].localFilters[0].values[0].u.replace("[650]", "[" + this.props.selectedRoomId + "]")
                    }
                }
            });


            this.cognosApi.initialize().then(() => {
                this.cognosApi.dashboard
                    .openDashboard({ dashboardSpec: dashSpecObj })
                    .then((dashboardAPI) => {
                        this.cognosApi.dashboardAPI = dashboardAPI;
                    }, () => {
                        this.getDashBoardSession();
                    })
                    .catch((err) => {
                        this.getDashBoardSession();
                        console.log(err);
                    });
            },
                (err) => {
                    this.getDashBoardSession();
                    console.log("Failed to create API. " + err.message);
                }
            );
        }
        // }
    }
    getDashBoardSession = async () => {
        let sessionResp = await httpClient("dash-session", "GET", undefined);
        this.sessionObj = sessionResp;
        this.sessionCode = this.sessionObj.sessionCode;
        localStorage.setItem("sessionCode", this.sessionObj.sessionCode);
        var time = new Date().getTime() + 1000 * 60 * 60 * 1;
        localStorage.setItem("expTime", time);
        this.initializeCognosApi();
    }
    render() {
        return (
            <React.Fragment>
                <h3 className="lead mt-0">Dashboard</h3>
                <div className="text-center" id="dash">
                    <br />
                    <br />
                    <h4 className="lead">Loading...</h4>
                    {/* <div>
                        <img src={defaultGraph} alt="graph" />
                    </div>
                    <div>
                        Click on the <strong>Active Session List</strong> on the left to load Dashboard
                    </div> */}
                </div>
            </React.Fragment>
        );
    }
}

export default DashboardMain;