"use client";

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}

export const ToggleCard = ({
  label,
  value = false,
  field,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();


  const onChange = () => {

    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success("Chat setting has updated"))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-7 w-full">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            onCheckedChange={onChange}
            checked={value}
          />
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return (
    <Skeleton className="rounded-xl p-10 w-full"></Skeleton>
  )
}