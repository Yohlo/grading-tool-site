import React, { Component } from "react";
import { connect } from 'react-redux';
import { Omnibar } from "@blueprintjs/select";
import {     
    Button,
    Hotkey,
    Hotkeys,
    HotkeysTarget,
    KeyCombo,
    MenuItem,
    Position,
    Toaster,
} from "@blueprintjs/core";
import { getStudents } from '../../actions';
import StudentSuggest from '../StudentSuggest';
import './styles.css';

class StudentOmnibar extends Component {
    constructor(props) {
        super(props)
        this.props = props;

        this.componentWillMount = this.componentWillMount.bind(this);
        this.itemRenderer = this.itemRenderer.bind(this);
        this.itemRenderer = this.itemRenderer.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleItemSelect = this.handleItemSelect.bind(this);

        this.state = {
            isOpen: false
        }
    }

    componentWillMount() {
        if(this.props.students && this.props.students.length < 1) {
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
    
    renderHotkeys() {
        return (
            <Hotkeys>
                <Hotkey
                    global={true}
                    combo="shift + o"
                    label="Show Omnibar"
                    onKeyDown={this.handleToggle}
                    // prevent typing "O" in omnibar input
                    preventDefault={true}
                />
            </Hotkeys>
        );
    }

    handleClose() { this.setState({ isOpen: false }); }

    handleToggle() { this.setState({ isOpen: !this.state.isOpen }); }

    handleClick(e) { this.setState({ isOpen: true }); };

    handleItemSelect(student) {
        this.setState({ isOpen: false, student });

        this.toaster.show({
            message: (
                <span>
                    You selected <strong>{student.name}</strong>.
                </span>
            ),
        });

        this.props.onChange(student);
    };

    render() {
        return (
            <>
                <span className="omni-click">
                    {/*<Button text="Click to select student" onClick={this.handleClick} />*/}
                    <StudentSuggest value={this.state.student} handleChange={this.handleItemSelect} />
                    {" or press "}
                    <KeyCombo combo="shift + o" />
                </span>

                <Omnibar
                    {...this.state}
                    onItemSelect={this.handleItemSelect}
                    onClose={this.handleClose}
                    minimal={true}
                    items={this.props.students} 
                    popoverProps={{ minimal: true }}
                    itemRenderer={this.itemRenderer} 
                    itemPredicate={this.itemPredicate} 
                    inputValueRenderer={this.renderInputValue}
                    noResults={<MenuItem disabled={true} text="No results." />}
                />
                <Toaster position={Position.TOP} ref={(ref) => this.toaster = ref} />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HotkeysTarget(StudentOmnibar));