import React from 'react';
import { H1, H3 } from "@blueprintjs/core";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

const Home = ({ student_group, is_admin }) => {
    return <div>
      <H1>CSCI-B351 Intro to AI</H1>

      {
        student_group === 0 ? <div>
            <H3>Tool-based grading</H3>
            <p>
                Your code will be tested by a grading tool on our objective criteria. The results of these tests will determine your score on the assignment. You will additionally receive detailed diagnostic information about what led your solutions to fail any of our criteria.
            </p> 
        </div> : student_group === 1 ? <div>
            <H3>Tool-assisted grading</H3>
            <p>
                Your code will be tested by a grading tool on our objective criteria. Graders will then inspect the output of our grading tool, award partial credit in rare circumstances, and provide feedback about how your code can be improved to meet the criteria. You will also be graded based on the subjective criteria of style, control flow, and syntax features. All grading is done independently by two different graders to ensure consistency.
            </p>
        </div> : <p>Cannot determine your grading group. Please email Kyle to resolve this.</p> 
    }

    {
        is_admin ? <>
            <H3>Admin</H3>
            <p>You're an Admin! Hopefully you're not Saul, though...</p>
            <NavLink to="/Admin">
                Navigate to Admin page
            </NavLink>
        </> : null
    }

    </div>
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        student_group: state.user.student_group,
        is_admin: state.user.is_admin
    };
}

export default connect(mapStateToProps)(Home);