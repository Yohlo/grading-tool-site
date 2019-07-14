import React, { Component } from "react";
import { connect } from 'react-redux';
import { Suggest } from "@blueprintjs/select";
import { MenuItem } from "@blueprintjs/core";
import { getStudents } from '../../actions';
import './styles.css';

class StudentSuggest extends Component {
    constructor(props) {
        super(props)
        this.props = props;

        this.componentWillMount = this.componentWillMount.bind(this);
        this.itemRenderer = this.itemRenderer.bind(this);
        this.itemRenderer = this.itemRenderer.bind(this);
    }

    componentWillMount() {
        if(this.props.students.length < 1) {
            this.props.getStudents()
        }
    }

    itemRenderer(student, { handleClick, modifiers, query }) {
        const text = `${student.name}`;
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                label={student.login.toLowerCase()}
                key={student.login}
                onClick={handleClick}
                text={this.highlightText(text, query)}
            />
        )};

    itemPredicate(query, item) {
        return `${item.name.toLowerCase()} ${item.login.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
    };
    
    renderInputValue(student) { return student.name; }

    highlightText(text, query) {
        let lastIndex = 0;
        const words = query
            .split(/\s+/)
            .filter(word => word.length > 0)
            .map(this.escapeRegExpChars);
        if (words.length === 0) {
            return [text];
        }
        const regexp = new RegExp(words.join("|"), "gi");
        const tokens = [];
        while (true) {
            const match = regexp.exec(text);
            if (!match) { break; }
            const length = match[0].length;
            const before = text.slice(lastIndex, regexp.lastIndex - length);
            if (before.length > 0) {
                tokens.push(before);
            }
            lastIndex = regexp.lastIndex;
            tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
        }
        const rest = text.slice(lastIndex);
        if (rest.length > 0) {
            tokens.push(rest);
        }
        return tokens;
    }
    
    escapeRegExpChars(text) {
        return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
    
    render() {
        return (
            <Suggest
                className="student-suggest"
                minimal={true}
                items={this.props.students} 
                popoverProps={{ minimal: true }}
                itemRenderer={this.itemRenderer} 
                itemPredicate={this.itemPredicate} 
                onItemSelect={this.props.handleChange}
                inputValueRenderer={this.renderInputValue}
                selectedItem={this.props.value}
                noResults={<MenuItem disabled={true} text="No results." />}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        students: state.admin.students
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        ...props,
        getStudents: () => dispatch(getStudents())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentSuggest);