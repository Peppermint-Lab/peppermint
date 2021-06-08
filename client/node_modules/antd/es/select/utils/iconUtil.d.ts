import * as React from 'react';
export default function getIcons({ suffixIcon, clearIcon, menuItemSelectedIcon, removeIcon, loading, multiple, prefixCls, }: {
    suffixIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
    menuItemSelectedIcon?: React.ReactNode;
    removeIcon?: React.ReactNode;
    loading?: boolean;
    multiple?: boolean;
    prefixCls: string;
}): {
    clearIcon: React.ReactNode;
    suffixIcon: {} | null;
    itemIcon: {} | null;
    removeIcon: {} | null;
};
