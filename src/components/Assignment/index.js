import React, { Component } from "react";
import { Tag, H1, Divider, Button, Intent, ProgressBar, Code, Tabs, Tab, Alert } from "@blueprintjs/core";
import { assignments } from '../../assignments';
import { startTest, checkTest, getAssignment, downloadFile, cancelTest, downloadStudentTest, downloadStudentInitial, downloadStudentRevision, submitInitial, submitRevision, getStudent, getStudentAssignment } from '../../actions';
import { connect } from 'react-redux';
import './styles.css';
import StudentOmnibar from "../StudentOmnibar";
import UserCard from "../UserCard";

const getCurrDate = () => {
    // courtesy of https://stackoverflow.com/a/36206597
    var dt = new Date();
    dt.setTime(dt.getTime()+dt.getTimezoneOffset()*60*1000);
    var offset = -300; //Timezone offset for EST in minutes.
    var estDate = new Date(dt.getTime() + offset*60*1000);
    return estDate
}

const timezoneOffset = () => {
    let date = new Date(),
        timezoneOffset = date.getTimezoneOffset(),
        hours = ('00' + Math.floor(Math.abs(timezoneOffset/60))).slice(-2),
        minutes = ('00' + Math.abs(timezoneOffset%60)).slice(-2),
        string = (timezoneOffset >= 0 ? '-' : '+') + hours + ':' + minutes;
    return string;
}

const StrongDate = ({date}) => {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var year = date.getFullYear();
    var day = date.getDate();
    var month = months[date.getMonth()];

    return <strong>
        {month} {day}, {year}
    </strong>;
}

class Assignment extends Component {
    constructor(props) {
        super(props)
        this.props = props;

        this.assignment_id = this.props.match.params.id
        this.assignment = assignments[this.assignment_id]
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.handleStudentChange = this.handleStudentChange.bind(this);

        this.state = {}
    }

    componentWillMount() {
        this.props.getAssignment(this.assignment_id);
        if(this.props.is_admin && this.props.student) {
            this.props.getStudentAssignment(this.props.student.login, this.assignment_id)
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.assignment) {
            if(this.props.assignment.job_id) {
                if (!this.timer)
                    this.timer = setInterval(()=> this.props.checkTest(this.assignment_id, this.props.assignment.job_id), 2000 * (parseInt(this.props.assignment.job_position, 10) + 1));
            } else {
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    handleStudentChange(selectedStudent) {
        this.setState({ selectedStudent });
        this.props.getStudent(selectedStudent.login)
        this.props.getStudentAssignment(selectedStudent.login, this.assignment_id)
    }

    render() {
        if(this.props.assignment === null) {
            this.props.getAssignment(this.assignment_id);
        }

        if(this.props.assignment && this.props.assignment.is_not_found) {
            return <p>Assignment not found. This is most likely because the grading tool for it hasn't been released yet. Stay tuned!</p>
        }

        return ( this.assignment ? 
            <div id={this.assignment.id}>

                <H1>{`Assignment ${this.assignment_id}`}</H1>

                <Tabs>

                    {
                        this.props.is_admin ?
                        <Tab id={"admin"} title="Admin" panel={
                            <>
                                <p>This option allows you to see students test and submission info.</p>
                                <StudentOmnibar onChange={this.handleStudentChange}/>
                                <p></p>
                                {
                                    this.props.student ?
                                    <UserCard 
                                        login={this.props.student.login}
                                        name={this.props.student.name}
                                        avatar_url={this.props.student.avatar_url}
                                    />: null
                                }

                                { 
                                this.props.student_assignment && this.props.student_assignment.file_exists && this.props.student_assignment.test_commit ?
                                    <>
                                        <Divider />
                                        <p>Their last test was run on commit <Code><a href={`https://github.iu.edu/csci-b351-sp19/${this.props.student.login}-submission/tree/${this.props.student_assignment.test_commit}/a${this.assignment_id}`}>{this.props.student_assignment.test_commit.substring(0, 6)}...</a> {this.props.student_assignment.test_comment}</Code></p>
                                        <p>Click the below button to open their most recent test results file.</p>
                                        <Button onClick={() => this.props.downloadStudentTest(this.props.student.login, this.assignment_id)} intent={Intent.PRIMARY}>
                                            Open Test Results
                                        </Button>
                                    </> : null
                                }

                                { this.props.student && <Divider /> }
                                { this.props.student_assignment && this.props.student_assignment.initial_commit ?
                                    <>
                                        <p>They have submitted commit <Code><a href={`https://github.iu.edu/csci-b351-sp19/${this.props.student.login}-submission/tree/${this.props.student_assignment.initial_commit}/a${this.assignment_id}`}>{this.props.student_assignment.initial_commit.substring(0, 6)}...</a> {this.props.student_assignment.initial_comment}</Code> as their initial submission.</p>
                                        <p>Click the below button to open their initial submission feedback file.</p>
                                        <Button onClick={() => this.props.downloadStudentInitial(this.props.student.login, this.assignment_id)} intent={Intent.PRIMARY}>
                                            Open Initial Submission Feedback
                                        </Button>
                                    </>
                                    : this.props.student && <p>They have not submitted their initial submission yet.</p>
                                }
                                { this.props.student && <Divider /> }
                                { this.props.student_assignment && this.props.student_assignment.revision_commit ?
                                    <>
                                        <p>They have submitted commit <Code><a href={`https://github.iu.edu/csci-b351-sp19/${this.props.student.login}-submission/tree/${this.props.student_assignment.revision_commit}/a${this.assignment_id}`}>{this.props.student_assignment.revision_commit.substring(0, 6)}...</a> {this.props.student_assignment.revision_comment}</Code> for revision.</p>
                                        <p>Click the below button to open their revision submission feedback file.</p>
                                        <Button onClick={() => this.props.downloadStudentRevision(this.props.student.login, this.assignment_id)} intent={Intent.PRIMARY}>
                                            Open Revision Submission Feedback
                                        </Button>
                                    </>
                                     : this.props.student && <p>They have not submitted their revision yet.</p>
                                }

                            </>
                        }/> : null
                    }

                    <Tab id="test" title="Test My Code" panel={
                        <>
                            <p>This option allows you to check whether or not your current commit passes our objective grading criteria. If you are in the tool-based grading group, then the score you see here should predict the score you will receive on your submission. If you are in the tool-assisted grading group, then the score you see here may change based on partial credit decisions and your score on the subjective criteria. Note that most of the grading tool's feedback is redacted to encourage you to debug on your own.</p>
                            <p><strong>Please note that this does not count as your submission. If you wish to submit, proceed to the submission tab.</strong></p>
                            { this.props.assignment ? 
                                !this.props.assignment.job_id ?
                                    <>
                                        <p>Click the below button to start a test for this assignment.</p>
                                        <Button onClick={() => this.props.startTest(this.assignment_id)} intent={Intent.PRIMARY}>
                                            Run Test
                                        </Button> 
                                    </> :
                                    <>
                                        <p>Your test is currently {parseInt(this.props.assignment.job_position) > 0 ? "enqueued" : "running"}. There are {this.props.assignment.job_position} {parseInt(this.props.assignment.job_position) === 1 ? "person" : "people"} in front of you in the queue. </p>
                                        <ProgressBar />
                                        {
                                            parseInt(this.props.assignment.job_position) > 0 ?
                                            <Button onClick={() => this.props.cancelTest(this.props.assignment.job_id)} intent={Intent.PRIMARY}>
                                                Cancel Test
                                            </Button> : <p>You cannot cancel your test at the moment since it appears to be running</p>
                                        }
                                    </> : null
                            }
                            { 
                                this.props.assignment && this.props.assignment.file_exists && this.props.assignment.test_commit ?
                                    <>
                                        <Divider />
                                        <p>Your last test was run on commit <Code><a href={`https://github.iu.edu/csci-b351-sp19/${this.props.login}-submission/tree/${this.props.assignment.test_commit}/a${this.assignment_id}`}>{this.props.assignment.test_commit.substring(0, 6)}...</a> {this.props.assignment.test_comment}</Code></p>
                                        <p>Click the below button to open your most recent test results file.</p>
                                        <Button onClick={() => this.props.downloadFile(this.assignment_id)} intent={Intent.PRIMARY}>
                                            Open Test Results
                                        </Button>
                                    </> : null
                            }
                        </>
                    }/>

                    <Tab id="submit" title="Initial Submission" panel={
                        <>
                            <p>This option allows you to submit your current commit for grading. You will receive detailed feedback on your code by Friday, so that you can make revisions for your revised submission next week.</p>

                            { this.props.assignment && this.props.assignment.initial_commit ?
                                    <p>You have submitted commit <Code><a href={`https://github.iu.edu/csci-b351-sp19/${this.props.login}-submission/tree/${this.props.assignment.initial_commit}/a${this.assignment_id}`}>{this.props.assignment.initial_commit.substring(0, 6)}...</a> {this.props.assignment.initial_comment}</Code></p>
                                     : <p>You have not submitted your initial submission yet.</p>
                            }

                            <Button 
                                onClick={() => this.setState({ isInitialAlertOpen: true })}
                                disabled={this.props.assignment && getCurrDate() > new Date(this.props.assignment.initial_due_date + "T23:59:59" + timezoneOffset())}
                                intent={Intent.PRIMARY}
                            >
                                Submit Current Commit
                            </Button>

                            <Alert
                                cancelButtonText="Cancel"
                                confirmButtonText="Submit"
                                intent={Intent.PRIMARY}
                                isOpen={this.state.isInitialAlertOpen}
                                onCancel={() => this.setState({ isInitialAlertOpen: false })}
                                onConfirm={() => {
                                    this.props.submitInitial(this.assignment_id)
                                    this.setState({ isInitialAlertOpen: false })
                                }}
                            >
                                <p>
                                    By clicking submit, I hereby declare that this is my own work and I have cited any sources that I used.
                                </p>
                            </Alert>

                            <p></p>
                            {
                                this.props.assignment && getCurrDate() > new Date(this.props.assignment.initial_due_date + "T23:59:59" + timezoneOffset()) ?
                                <Tag intent={Intent.DANGER}>
                                    Initial submissions for this assignment were due on <StrongDate date={new Date(this.props.assignment.initial_due_date + "T23:59:59" + timezoneOffset())} /> at 11:59PM EST.
                                </Tag>
                                : this.props.assignment ? <Tag intent={Intent.NONE}>
                                    Submissions for this assignment are due on  <StrongDate date={new Date(this.props.assignment.initial_due_date + "T23:59:59" + timezoneOffset())} /> at 11:59PM EST.
                                </Tag> : null
                            }
                        </>
                    }/>
                    <Tab id="revise" title="Revision Submission" disabled={this.props.assignment && getCurrDate() <= new Date(this.props.assignment.initial_due_date + "T23:59:59" + timezoneOffset())} panel={
                        <>
                            <p>This option allows you to submit your current commit for grading. Your grade on your revision will replace 75% of the grade for your initial submission. You will also receive feedback on your code.</p>
                            
                            

                            { this.props.assignment && this.props.assignment.revision_commit ?
                                <p>You have submitted commit <Code><a href={`https://github.iu.edu/csci-b351-sp19/${this.props.login}-submission/tree/${this.props.assignment.revision_commit}/a${this.assignment_id}`}>{this.props.assignment.revision_commit.substring(0, 6)}...</a> {this.props.assignment.revision_comment}</Code></p>
                                    : <p>You have not submitted your revision yet.</p>
                            }

                            <Button 
                                onClick={() => this.setState({ isRevisionAlertOpen: true })}
                                disabled={this.props.assignment && getCurrDate() > new Date(this.props.assignment.revision_due_date + "T23:59:59" + timezoneOffset())}
                                intent={Intent.PRIMARY}
                            >
                                Submit Current Commit
                            </Button>
                            <Alert
                                cancelButtonText="Cancel"
                                confirmButtonText="Submit"
                                intent={Intent.PRIMARY}
                                isOpen={this.state.isRevisionAlertOpen}
                                onCancel={() => this.setState({ isRevisionAlertOpen: false })}
                                onConfirm={() => {
                                    this.props.submitRevision(this.assignment_id)
                                    this.setState({ isRevisionAlertOpen: false })
                                }}
                            >
                                <p>
                                    By clicking submit, I hereby declare that this is my own work and I have cited any sources that I used.
                                </p>
                            </Alert>
                            <p></p>
                            {
                                this.props.assignment && getCurrDate() > new Date(this.props.assignment.revision_due_date + "T23:59:59" + timezoneOffset()) ?
                                <Tag intent={Intent.DANGER}>
                                    Revision submissions for this assignment were due on <StrongDate date={new Date(this.props.assignment.revision_due_date + "T23:59:59" + timezoneOffset())} /> at 11:59PM EST.
                                </Tag>
                                : this.props.assignment ? <Tag intent={Intent.NONE}>
                                    Revision submissions for this assignment are due on  <StrongDate date={new Date(this.props.assignment.revision_due_date + "T23:59:59" + timezoneOffset())} /> at 11:59PM EST.
                                </Tag> : null
                            }
                        </>
                    }/>
                </Tabs>
                
                <Divider />
            </div> : null
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        assignment: state.user.assignment,
        login: state.user.login,
        student: state.admin.student,
        is_admin: state.user.is_admin,
        student_assignment: state.admin.assignment
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        ...props,
        startTest: (id) => dispatch(startTest(id)),
        checkTest: (assignment_id, job_id) => dispatch(checkTest(assignment_id, job_id)),
        cancelTest: (job_id) => dispatch(cancelTest(job_id)),
        getAssignment: (id) => dispatch(getAssignment(id)),
        downloadFile: (id) => dispatch(downloadFile(id)),
        submitInitial: (id) => dispatch(submitInitial(id)),
        submitRevision: (id) => dispatch(submitRevision(id)),
        getStudent: (login) => dispatch(getStudent(login)),
        getStudentAssignment: (login, id) => dispatch(getStudentAssignment(login, id)),
        downloadStudentTest: (login, id) => dispatch(downloadStudentTest(login, id)),
        downloadStudentInitial: (login, id) => dispatch(downloadStudentInitial(login, id)),
        downloadStudentRevision: (login, id) => dispatch(downloadStudentRevision(login, id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);