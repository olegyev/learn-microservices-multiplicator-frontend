import * as React from 'react';

class LastAttemptsComponent extends React.Component {

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Challenge</th>
                        <th>Your guess</th>
                        <th>Correct</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.lastAttempts.map(attempt =>
                        <tr key={attempt.id}
                            style={{ color: attempt.correct ? 'green' : 'red' }}>
                            <td>{attempt.factorA} X {attempt.factorB}</td>
                            <td>{attempt.resultAttempt}</td>
                            <td>{attempt.correct ? 
                                "Correct" :
                                ("Incorrect (" + attempt.factorA * attempt.factorB + ")")}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

}

export default LastAttemptsComponent;