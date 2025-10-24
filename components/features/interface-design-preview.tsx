"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";

export default function InterfaceDesignPreview() {
  return (
    <div className="relative flex flex-col items-start p-6 md:p-8 gap-6 h-full overflow-hidden">
      <div className="grid grid-cols-3 gap-3 w-full">
        {/* 1) Button group */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 rounded-xl p-4 bg-neutral-900/60 ring-1 ring-white/10"
        >
          <div className="flex items-center gap-3">
            <Button className="bg-[#B81817] hover:bg-[#b81817]/90 text-white">
              Continue
              <IconArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              Explore
              <IconSparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* 2) Input with label */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 md:col-span-2 rounded-xl p-4 bg-neutral-900/60 ring-1 ring-white/10"
        >
          <Label htmlFor="email" className="text-white/80 text-xs">
            Your email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mt-2 bg-white/5 border-white/15 text-white placeholder:text-white/40"
          />
        </motion.div>

        {/* 3) Switch with label */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 md:col-span-1 rounded-xl p-4 bg-neutral-900/60 ring-1 ring-white/10"
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="notify" className="text-white/80 text-sm">
              Notifications
            </Label>
            <Switch id="notify" defaultChecked className="data-[state=checked]:bg-[#B81817]" />
          </div>
        </motion.div>

        {/* 4) Card with image + text */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 md:col-span-2 rounded-xl bg-neutral-900/60 ring-1 ring-white/10 overflow-hidden"
        >
          <Card className="bg-transparent border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Preview Card</CardTitle>
              <CardDescription className="text-white/60 text-xs">
                Compact layout & clear hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-24 w-full rounded-lg bg-white/5 ring-1 ring-white/10" />
              <div className="mt-3 h-2 w-5/6 rounded bg-white/15" />
              <div className="mt-2 h-2 w-3/6 rounded bg-white/10" />
            </CardContent>
          </Card>
        </motion.div>

        {/* 5) Select */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 md:col-span-1 rounded-xl p-4 bg-neutral-900/60 ring-1 ring-white/10"
        >
          <Label className="text-white/80 text-sm">Discipline</Label>
          <div className="mt-2">
            <Select defaultValue="design">
              <SelectTrigger className="bg-white/5 border-white/15 text-white">
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 text-white border-white/15">
                <SelectItem value="design">Interface Design</SelectItem>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* 6) Progress */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 rounded-xl p-4 bg-neutral-900/60 ring-1 ring-white/10"
        >
          <Label className="text-white/80 text-sm">Prototype fidelity</Label>
          <div className="mt-2">
            <Progress value={62} className="h-2 bg-white/10" />
          </div>
        </motion.div>
      </div>

      {/* Edge fades for overflow safety on narrow widths */}
      <div className="absolute left-0 inset-y-0 w-16 bg-linear-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-linear-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
}