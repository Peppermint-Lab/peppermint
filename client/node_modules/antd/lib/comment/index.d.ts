import * as React from 'react';
export interface CommentProps {
    /** List of action items rendered below the comment content */
    actions?: Array<React.ReactNode>;
    /** The element to display as the comment author. */
    author?: React.ReactNode;
    /** The element to display as the comment avatar - generally an antd Avatar */
    avatar?: React.ReactNode;
    /** ClassName of comment */
    className?: string;
    /** The main content of the comment */
    content: React.ReactNode;
    /** Nested comments should be provided as children of the Comment */
    children?: React.ReactNode;
    /** Comment prefix defaults to '.ant-comment' */
    prefixCls?: string;
    /** Additional style for the comment */
    style?: React.CSSProperties;
    /** A datetime element containing the time to be displayed */
    datetime?: React.ReactNode;
}
declare const Comment: React.FC<CommentProps>;
export default Comment;
