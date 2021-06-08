import InternalRadio from './radio';
import Group from './group';
import Button from './radioButton';
var Radio = InternalRadio;
Radio.Button = Button;
Radio.Group = Group;
export { Button, Group };
export default Radio;