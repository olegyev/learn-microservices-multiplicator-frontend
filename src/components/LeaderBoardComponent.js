import * as React from "react";
import ApiClient from "../services/ApiClient";

class LeaderBoardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leaderboard: [],
            serverError: false
        }
    }

    componentDidMount() {
        this.refreshLeaderBoard();
        // refresh the leaderboard every 5 seconds
        setInterval(this.refreshLeaderBoard.bind(this), 5000);
    }

    getLeaderBoardData(): Promise {
        return ApiClient.leaderBoard().then(
            lbRes => {
                if (lbRes.ok) {
                    return lbRes.json();
                } else {
                    return Promise.reject("Gamification: error response.");
                }
            }
        );
    }

    getUserAliasData(userIds: number[]): Promise {
        return ApiClient.getUsers(userIds).then(
            usRes => {
                if (usRes.ok) {
                    return usRes.json();
                } else {
                    return Promise.reject("Multiplication: error response.");
                }
            }
        );
    }

    updateLeaderBoard(lb) {
        this.setState({
            leaderboard: lb,
            serverError: false
        });
    }

    refreshLeaderBoard() {
        this.getLeaderBoardData().then(
            lbData => {
                let userIds = lbData.map(row => row.userId);
                this.getUserAliasData(userIds).then(users => {
                    // create id -> alias map
                    let userIdAliasMap = new Map();
                    users.forEach(user => {
                        userIdAliasMap.set(user.id, user.alias);
                    });
                    // add alias to server's leaderboard data
                    lbData.forEach(row =>
                        row['alias'] = userIdAliasMap.get(row.userId)
                    );
                    this.updateLeaderBoard(lbData);
                }).catch(reason => {
                    console.log('Error mapping user IDs.', reason);
                    this.updateLeaderBoard(lbData);
                });
            }
        ).catch(reason => {
            console.log('Gamification: server error.', reason);
            this.setState({ serverError: true });
        });
    }

    render() {
        if (this.state.serverError) {
            return (
                <div>Sorry, game statistics cannot be displayed. We're working on it!</div>
            );
        }

        return (
            <div>
                <h3>Leaderboard</h3>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Score</th>
                            <th>Badges</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.leaderboard.map(row =>
                         <tr key={row.userId}>
                             <td>{row.alias ? row.alias : row.userId}</td>
                             <td>{row.totalScore}</td>
                             <td>{row.badges.map(
                                b => <span className="badge" key={b}>{b}</span>)}
                             </td>
                         </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default LeaderBoardComponent;