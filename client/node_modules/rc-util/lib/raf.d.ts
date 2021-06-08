declare function wrapperRaf(callback: () => void): number;
declare namespace wrapperRaf {
    var cancel: (num: number) => void;
}
export default wrapperRaf;
