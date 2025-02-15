import { Label } from "@/shadcn/ui/label";
import { Switch } from "@/shadcn/ui/switch";
import { UISettings } from "../../types/tickets";

interface DisplaySettingsProps {
  settings: UISettings;
  onChange: (setting: keyof UISettings, value: boolean) => void;
}

export default function DisplaySettings({ settings, onChange }: DisplaySettingsProps) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">Display Options</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-avatars" className="text-sm">Show Avatars</Label>
          <Switch
            id="show-avatars"
            checked={settings.showAvatars}
            onCheckedChange={(checked) => onChange('showAvatars', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-dates" className="text-sm">Show Dates</Label>
          <Switch
            id="show-dates"
            checked={settings.showDates}
            onCheckedChange={(checked) => onChange('showDates', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-priority" className="text-sm">Show Priority</Label>
          <Switch
            id="show-priority"
            checked={settings.showPriority}
            onCheckedChange={(checked) => onChange('showPriority', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-type" className="text-sm">Show Type</Label>
          <Switch
            id="show-type"
            checked={settings.showType}
            onCheckedChange={(checked) => onChange('showType', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-numbers" className="text-sm">Show Ticket Numbers</Label>
          <Switch
            id="show-numbers"
            checked={settings.showTicketNumbers}
            onCheckedChange={(checked) => onChange('showTicketNumbers', checked)}
          />
        </div>
      </div>
    </div>
  );
} 