import {
    type ListboxProps,
    type ListboxSectionProps,
    type Selection,
    Listbox,
    Tooltip,
    ListboxItem,
    ListboxSection,
    Skeleton,
} from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/utils";

export type SidebarItem = {
    key: string;
    title: string;
    icon?: string;
    href?: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    items?: SidebarItem[];
    className?: string;
};

export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
    items: SidebarItem[];
    isCompact?: boolean;
    hideEndContent?: boolean;
    iconClassName?: string;
    sectionClasses?: ListboxSectionProps["classNames"];
    classNames?: ListboxProps["classNames"];
    defaultSelectedKey: string;
    onSelect?: (key: string) => void;
    isLoading?: boolean;
};

const LoadingItem = () => {
    return (
        <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
        </div>
    );
};
const Loading = () => {
    return (
        <div className="flex flex-col gap-10">
            {Array.from({ length: 5 }).map((_, index) => (
                <LoadingItem key={index} />
            ))}
        </div>
    );
};

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
    (
        {
            items,
            isCompact,
            defaultSelectedKey,
            onSelect,
            hideEndContent,
            sectionClasses: sectionClassesProp = {},
            itemClasses: itemClassesProp = {},
            iconClassName,
            className,
            isLoading,
            ...props
        },
        ref,
    ) => {
        const [selected, setSelected] =
            React.useState<React.Key>(defaultSelectedKey);

        const sectionClasses = {
            ...sectionClassesProp,
            base: cn(sectionClassesProp?.base, {
                "p-0 max-w-[44px]": isCompact,
            }),
            group: cn(sectionClassesProp?.group, {
                "flex flex-col gap-1": isCompact,
            }),
            heading: cn(sectionClassesProp?.heading, {
                hidden: isCompact,
            }),
        };

        const itemClasses = {
            ...itemClassesProp,
            base: cn(itemClassesProp?.base, {
                "w-11 h-11 gap-0 p-0": isCompact,
            }),
        };

        if (isLoading) {
            return <Loading />;
        }

        const renderItem = React.useCallback(
            (item: SidebarItem) => {
                return (
                    <ListboxItem
                        {...item}
                        key={item.key}
                        endContent={
                            isCompact || hideEndContent
                                ? null
                                : item.endContent ?? null
                        }
                        startContent={
                            isCompact ? null : item.icon ? (
                                <Icon
                                    className={cn(
                                        "text-default-500 group-data-[selected=true]:text-foreground",
                                        iconClassName,
                                    )}
                                    icon={item.icon}
                                    width={24}
                                />
                            ) : (
                                item.startContent ?? null
                            )
                        }
                        title={isCompact ? null : item.title}
                    >
                        {isCompact ? (
                            <Tooltip content={item.title} placement="right">
                                <div className="flex w-full items-center justify-center">
                                    {item.icon ? (
                                        <Icon
                                            className={cn(
                                                "text-default-500 group-data-[selected=true]:text-foreground",
                                                iconClassName,
                                            )}
                                            icon={item.icon}
                                            width={24}
                                        />
                                    ) : (
                                        item.startContent ?? null
                                    )}
                                </div>
                            </Tooltip>
                        ) : null}
                    </ListboxItem>
                );
            },
            [isCompact, hideEndContent, iconClassName],
        );

        return (
            <Listbox
                key={isCompact ? "compact" : "default"}
                ref={ref}
                hideSelectedIcon
                as="nav"
                className={cn("list-none", className)}
                color="default"
                itemClasses={{
                    ...itemClasses,
                    base: cn(
                        "px-3 rounded-large h-[44px] data-[selected=true]:bg-default-100",
                        itemClasses?.base,
                    ),
                    title: cn(
                        "text-small font-medium text-default-500 group-data-[selected=true]:text-foreground",
                        itemClasses?.title,
                    ),
                }}
                items={items}
                selectedKeys={[selected] as unknown as Selection}
                selectionMode="single"
                variant="flat"
                onSelectionChange={(keys) => {
                    const key = Array.from(keys)[0];

                    setSelected(key as React.Key);
                    onSelect?.(key as string);
                }}
                {...props}
            >
                {(item) =>
                    item.items && item.items?.length > 0 ? (
                        <ListboxSection
                            key={item.key}
                            classNames={sectionClasses}
                            showDivider={isCompact}
                            title={item.title}
                        >
                            {item.items.map(renderItem)}
                        </ListboxSection>
                    ) : (
                        renderItem(item)
                    )
                }
            </Listbox>
        );
    },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
