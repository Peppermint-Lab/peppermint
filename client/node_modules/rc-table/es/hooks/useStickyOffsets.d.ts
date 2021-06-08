import { StickyOffsets } from '../interface';
/**
 * Get sticky column offset width
 */
declare function useStickyOffsets(colWidths: number[], columnCount: number, direction: 'ltr' | 'rtl'): StickyOffsets;
export default useStickyOffsets;
