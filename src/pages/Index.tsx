import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_SECTIONS = [
  {
    label: "Модерация",
    items: [
      { id: "players", label: "Игроки", icon: "Users" },
      { id: "chat", label: "Чат", icon: "MessageSquare" },
      { id: "reports", label: "Репорты", icon: "Flag" },
      { id: "checks", label: "Проверки", icon: "ShieldCheck" },
      { id: "notifications", label: "Оповещения", icon: "Bell" },
      { id: "bans", label: "Блокировки", icon: "Ban" },
    ],
  },
  {
    label: "Управление",
    items: [
      { id: "audit", label: "Журнал аудита", icon: "ClipboardList" },
      { id: "servers", label: "Серверы", icon: "Server" },
      { id: "staff", label: "Сотрудники", icon: "UserCog" },
    ],
  },
];

const MOCK_PLAYERS = [
  { id: 1, name: "taximaxim", status: "online", ip: "188.233.254.75", country: "🇷🇺 Россия", city: "Omsk", isp: 'JSC "ER-Telecom Holding"', server: "main-01" },
  { id: 2, name: "ghost_rider", status: "online", ip: "92.45.112.33", country: "🇷🇺 Россия", city: "Москва", isp: "Rostelecom PJSC", server: "main-02" },
  { id: 3, name: "xXhunterXx", status: "offline", ip: "176.14.88.201", country: "🇩🇪 Германия", city: "Berlin", isp: "Deutsche Telekom AG", server: "eu-01" },
  { id: 4, name: "speedrun_pro", status: "online", ip: "213.87.140.5", country: "🇷🇺 Россия", city: "СПб", isp: "MegaFon PJSC", server: "main-01" },
  { id: 5, name: "nacht_wolf", status: "offline", ip: "91.201.66.99", country: "🇺🇦 Украина", city: "Kyiv", isp: "Kyivstar", server: "eu-02" },
];

const MOCK_CHAT = [
  { id: 1, time: "00:41", player: "taximaxim", message: "21312", server: "main-01" },
  { id: 2, time: "00:41", player: "taximaxim", message: "2131", server: "main-01" },
  { id: 3, time: "00:41", player: "taximaxim", message: "cerf", server: "main-01" },
  { id: 4, time: "01:15", player: "ghost_rider", message: "кто нибудь онлайн?", server: "main-02" },
  { id: 5, time: "01:16", player: "speedrun_pro", message: "я тут", server: "main-01" },
  { id: 6, time: "02:33", player: "xXhunterXx", message: "gg wp", server: "eu-01" },
  { id: 7, time: "03:10", player: "nacht_wolf", message: "всем привет", server: "eu-02" },
];

const MOCK_REPORTS = [
  { id: 1, date: "19.03.26 00:41", reporter: "asdasda", suspect: "taximaxim", steamId: "76561198324308990", contacts: "extazx", verdict: "cancelled", server: "main-01" },
  { id: 2, date: "19.03.26 01:22", reporter: "ghost_rider", suspect: "xXhunterXx", steamId: "76561198100123456", contacts: "—", verdict: "cheating", server: "eu-01" },
  { id: 3, date: "18.03.26 22:10", reporter: "speedrun_pro", suspect: "nacht_wolf", steamId: "76561198200654321", contacts: "discord: wolf99", verdict: "clean", server: "eu-02" },
];

const MOCK_CHECKS = [
  { id: 1, date: "19.03.26 00:41", checker: "asdasda", checkerTag: "@asdasda", suspect: "taximaxim", steamId: "76561198324308990", contacts: "extazx", verdict: "cancelled" },
  { id: 2, date: "19.03.26 01:30", checker: "ghost_rider", checkerTag: "@ghost", suspect: "xXhunterXx", steamId: "76561198100123456", contacts: "—", verdict: "cheating" },
  { id: 3, date: "18.03.26 20:05", checker: "admin_root", checkerTag: "@root", suspect: "speedrun_pro", steamId: "76561198200001111", contacts: "vk: sp_pro", verdict: "clean" },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, time: "19.03.26 00:41", text: "Новый репорт на taximaxim от asdasda", priority: "medium" },
  { id: 2, time: "19.03.26 01:22", text: "Игрок xXhunterXx получил блокировку на 7 дней", priority: "high" },
  { id: 3, time: "18.03.26 22:10", text: "Проверка nacht_wolf завершена: чист", priority: "low" },
  { id: 4, time: "18.03.26 20:00", text: "Сервер eu-01 перезагружен", priority: "low" },
];

const MOCK_BANS = [
  { id: 1, player: "xXhunterXx", steamId: "76561198100123456", reason: "Читы (аимбот)", admin: "ghost_rider", date: "19.03.26", expires: "26.03.26", server: "eu-01" },
  { id: 2, player: "nacht_wolf", steamId: "76561198200654321", reason: "Токсичное поведение", admin: "admin_root", date: "18.03.26", expires: "21.03.26", server: "eu-02" },
  { id: 3, player: "spam_acc", steamId: "76561198399999999", reason: "Спам / реклама", admin: "asdasda", date: "17.03.26", expires: "Перм.", server: "main-01" },
];

const MOCK_AUDIT = [
  { id: 1, time: "19.03.26 00:41", admin: "asdasda", action: "Отмена проверки", target: "taximaxim", details: "ID проверки #1421" },
  { id: 2, time: "19.03.26 01:22", admin: "ghost_rider", action: "Выдача бана", target: "xXhunterXx", details: "7 дней — читы" },
  { id: 3, time: "18.03.26 22:10", admin: "admin_root", action: "Завершение проверки", target: "nacht_wolf", details: "Вердикт: чист" },
  { id: 4, time: "18.03.26 20:00", admin: "system", action: "Перезагрузка сервера", target: "eu-01", details: "Плановое ТО" },
];

const MOCK_SERVERS = [
  { id: 1, name: "main-01", ip: "185.99.133.12:27015", map: "de_dust2", players: "18/32", ping: 14, status: "online", region: "RU" },
  { id: 2, name: "main-02", ip: "185.99.133.13:27015", map: "de_inferno", players: "24/32", ping: 18, status: "online", region: "RU" },
  { id: 3, name: "eu-01", ip: "95.216.10.21:27015", map: "de_mirage", players: "8/32", ping: 42, status: "online", region: "EU" },
  { id: 4, name: "eu-02", ip: "95.216.10.22:27015", map: "de_nuke", players: "0/32", ping: 0, status: "offline", region: "EU" },
];

const MOCK_STAFF = [
  { id: 1, name: "admin_root", role: "Владелец", since: "01.01.25", actions: 412, status: "online" },
  { id: 2, name: "asdasda", role: "Администратор", since: "15.02.25", actions: 231, status: "online" },
  { id: 3, name: "ghost_rider", role: "Модератор", since: "10.03.25", actions: 87, status: "offline" },
  { id: 4, name: "speedrun_pro", role: "Хелпер", since: "18.03.26", actions: 3, status: "online" },
];

const verdictConfig: Record<string, { label: string; color: string }> = {
  cancelled: { label: "Отменена", color: "text-[hsl(0,0%,50%)] bg-[hsl(0,0%,14%)]" },
  cheating:  { label: "Читы",     color: "text-red-400 bg-red-950/40" },
  clean:     { label: "Чист",     color: "text-emerald-400 bg-emerald-950/40" },
};

const priorityDot: Record<string, string> = {
  high: "bg-red-400",
  medium: "bg-yellow-400",
  low: "bg-[hsl(0,0%,30%)]",
};
const priorityLabel: Record<string, string> = {
  high: "Высокий", medium: "Средний", low: "Низкий",
};

function AvatarBadge({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const palette = ["bg-orange-500", "bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-pink-500", "bg-cyan-500"];
  const color = palette[name.charCodeAt(0) % palette.length];
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm";
  return (
    <div className={`${sz} ${color} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 select-none`}>
      {name[0].toUpperCase()}
    </div>
  );
}

function Dot({ status }: { status: string }) {
  return <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${status === "online" ? "bg-emerald-400" : "bg-[hsl(0,0%,28%)]"}`} />;
}

function Verdict({ v }: { v: string }) {
  const c = verdictConfig[v] ?? { label: v, color: "text-muted-foreground bg-muted" };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.color}`}>{c.label}</span>;
}

function TH({ children }: { children: React.ReactNode }) {
  return <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-8 whitespace-nowrap">{children}</th>;
}

function SearchBar() {
  return (
    <div className="flex items-center gap-2 bg-[hsl(0,0%,12%)] border border-[hsl(0,0%,15%)] rounded-md px-3 py-1.5 w-52">
      <Icon name="Search" size={13} className="text-muted-foreground flex-shrink-0" />
      <input className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" placeholder="Поиск..." />
    </div>
  );
}

// ---- Player Profile Modal ----

type Player = typeof MOCK_PLAYERS[0];

const PLAYER_TABS = [
  { id: "overview", label: "Обзор", icon: "LayoutDashboard" },
  { id: "team", label: "Команда", icon: "Users" },
  { id: "reports", label: "Репорты", icon: "Flag" },
  { id: "stats", label: "Статистика", icon: "BarChart2" },
  { id: "activity", label: "Лог активности", icon: "Activity" },
  { id: "notifs", label: "Оповещения", icon: "Bell" },
  { id: "drawings", label: "Рисунки", icon: "PenTool" },
  { id: "checks", label: "Проверки", icon: "ShieldCheck", badge: 1 },
  { id: "mutes", label: "Муты", icon: "VolumeX" },
  { id: "bans2", label: "Блокировки", icon: "Ban" },
  { id: "perms", label: "Разрешения", icon: "Settings" },
];

type ActionDialog = "mute" | "ban" | "check" | "kick" | null;

function ActionConfirmDialog({
  type,
  player,
  onClose,
}: {
  type: ActionDialog;
  player: Player;
  onClose: () => void;
}) {
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("60");

  if (!type) return null;

  const config = {
    mute: { title: "Выдать мут", icon: "VolumeX", color: "text-yellow-400", btnColor: "bg-yellow-600 hover:bg-yellow-500", btnLabel: "Замутить", showDuration: true },
    ban: { title: "Заблокировать", icon: "Ban", color: "text-red-400", btnColor: "bg-red-700 hover:bg-red-600", btnLabel: "Заблокировать", showDuration: true },
    check: { title: "Начать проверку", icon: "ShieldCheck", color: "text-blue-400", btnColor: "bg-blue-700 hover:bg-blue-600", btnLabel: "Начать проверку", showDuration: false },
    kick: { title: "Кикнуть", icon: "LogOut", color: "text-orange-400", btnColor: "bg-orange-700 hover:bg-orange-600", btnLabel: "Кикнуть", showDuration: false },
  }[type];

  const durations = [
    { v: "30", l: "30 минут" },
    { v: "60", l: "1 час" },
    { v: "1440", l: "1 день" },
    { v: "10080", l: "7 дней" },
    { v: "43200", l: "30 дней" },
    { v: "0", l: "Навсегда" },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative z-10 bg-[hsl(0,0%,12%)] border border-[hsl(0,0%,18%)] rounded-xl shadow-2xl animate-fade-in w-96 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-8 h-8 rounded-lg bg-[hsl(0,0%,16%)] flex items-center justify-center ${config.color}`}>
            <Icon name={config.icon} size={16} />
          </div>
          <div>
            <div className="text-sm font-semibold">{config.title}</div>
            <div className="text-xs text-muted-foreground">Игрок: <span className="text-foreground font-medium">{player.name}</span></div>
          </div>
          <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={14} />
          </button>
        </div>

        {/* Duration (mute/ban only) */}
        {config.showDuration && (
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-2">Длительность</div>
            <div className="grid grid-cols-3 gap-1.5">
              {durations.map((d) => (
                <button
                  key={d.v}
                  onClick={() => setDuration(d.v)}
                  className={`text-xs py-1.5 rounded-md transition-colors ${
                    duration === d.v
                      ? "bg-[hsl(0,0%,22%)] text-foreground font-medium"
                      : "bg-[hsl(0,0%,15%)] text-muted-foreground hover:bg-[hsl(0,0%,18%)]"
                  }`}
                >
                  {d.l}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reason */}
        <div className="mb-5">
          <div className="text-xs text-muted-foreground mb-2">Причина</div>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={type === "check" ? "Подозрение в читерстве..." : type === "kick" ? "Причина кика..." : "Укажите причину..."}
            className="w-full bg-[hsl(0,0%,15%)] border border-[hsl(0,0%,18%)] rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none focus:border-[hsl(0,0%,25%)] transition-colors"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm text-muted-foreground bg-[hsl(0,0%,15%)] hover:bg-[hsl(0,0%,18%)] rounded-lg transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={onClose}
            className={`flex-1 py-2 text-sm text-white font-medium rounded-lg transition-colors ${config.btnColor}`}
          >
            {config.btnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function PlayerProfile({ player, onClose }: { player: Player; onClose: () => void }) {
  const [tab, setTab] = useState("overview");
  const [actionMenu, setActionMenu] = useState(false);
  const [actionDialog, setActionDialog] = useState<ActionDialog>(null);

  const openAction = (type: ActionDialog) => {
    setActionMenu(false);
    setActionDialog(type);
  };

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 flex bg-[hsl(0,0%,11%)] rounded-xl border border-[hsl(0,0%,16%)] shadow-2xl animate-fade-in overflow-hidden"
        style={{ width: 660, maxHeight: "60vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left panel */}
        <div className="w-48 flex-shrink-0 bg-[hsl(0,0%,9%)] border-r border-[hsl(0,0%,14%)] flex flex-col">
          {/* Player header */}
          <div className="p-4 border-b border-[hsl(0,0%,14%)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <AvatarBadge name={player.name} size="md" />
                <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[hsl(0,0%,9%)] ${player.status === "online" ? "bg-emerald-400" : "bg-yellow-500"}`} />
              </div>
              <div>
                <div className="text-sm font-semibold">{player.name}</div>
                <div className="text-xs text-muted-foreground">{player.status === "online" ? "онлайн" : "нет на месте"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center bg-[hsl(0,0%,15%)] hover:bg-[hsl(0,0%,18%)] transition-colors rounded-md py-1.5 text-muted-foreground hover:text-foreground">
                <Icon name="RefreshCw" size={12} />
              </button>
              {/* Actions dropdown */}
              <div className="relative flex-1">
                <button
                  onClick={() => setActionMenu((v) => !v)}
                  className="w-full flex items-center justify-center bg-[hsl(0,0%,15%)] hover:bg-[hsl(0,0%,18%)] transition-colors rounded-md py-1.5 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="MoreHorizontal" size={12} />
                </button>
                {actionMenu && (
                  <div className="absolute left-0 top-full mt-1 w-44 bg-[hsl(0,0%,14%)] border border-[hsl(0,0%,20%)] rounded-lg shadow-xl z-20 py-1 animate-fade-in">
                    <button onClick={() => openAction("check")} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-blue-400 hover:bg-[hsl(0,0%,18%)] transition-colors text-left">
                      <Icon name="ShieldCheck" size={13} />Начать проверку
                    </button>
                    <button onClick={() => openAction("mute")} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-yellow-400 hover:bg-[hsl(0,0%,18%)] transition-colors text-left">
                      <Icon name="VolumeX" size={13} />Выдать мут
                    </button>
                    <button onClick={() => openAction("kick")} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-orange-400 hover:bg-[hsl(0,0%,18%)] transition-colors text-left">
                      <Icon name="LogOut" size={13} />Кикнуть
                    </button>
                    <div className="border-t border-[hsl(0,0%,18%)] my-1" />
                    <button onClick={() => openAction("ban")} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:bg-[hsl(0,0%,18%)] transition-colors text-left">
                      <Icon name="Ban" size={13} />Заблокировать
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Tabs nav */}
          <nav className="flex-1 overflow-y-auto py-1 px-1">
            {PLAYER_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors text-left mb-0.5 ${
                  tab === t.id
                    ? "bg-[hsl(0,0%,16%)] text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-[hsl(0,0%,13%)]"
                }`}
              >
                <Icon name={t.icon} size={13} className={tab === t.id ? "text-[hsl(28,100%,55%)]" : ""} />
                <span className="flex-1">{t.label}</span>
                {t.badge && (
                  <span className="bg-[hsl(28,100%,55%)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right content */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === "overview" && (
            <div className="space-y-4 animate-fade-in">
              {/* Tags row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-xs bg-[hsl(0,0%,15%)] px-2.5 py-1 rounded-full text-yellow-400">
                  👤 Сотрудник
                </span>
                <span className="flex items-center gap-1 text-xs bg-[hsl(0,0%,15%)] px-2.5 py-1 rounded-full text-yellow-400">
                  🟡 Соло
                </span>
                <span className="flex items-center gap-1 text-xs bg-[hsl(0,0%,15%)] px-2.5 py-1 rounded-full text-foreground">
                  🇷🇺 RU
                </span>
                <span className="flex items-center gap-1 text-xs bg-[hsl(0,0%,15%)] px-2.5 py-1 rounded-full text-red-400">
                  ☠️ Пират
                </span>
                <span className="flex items-center gap-1 text-xs bg-[hsl(0,0%,15%)] px-2.5 py-1 rounded-full text-blue-400">
                  🖥 37 ms
                </span>
              </div>

              {/* Состояние */}
              <div className="bg-[hsl(0,0%,13%)] rounded-lg p-4">
                <div className="text-xs font-semibold text-foreground mb-3">Состояние</div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Двигался", value: "3 мин. назад" },
                    { label: "Был дома", value: "Сейчас" },
                    { label: "Квадрат", value: "F4" },
                    { label: "На сервере", value: "38 минут" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-[11px] text-muted-foreground mb-0.5">{s.label}</div>
                      <div className="text-sm font-medium">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Статистика */}
              <div className="bg-[hsl(0,0%,13%)] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-semibold text-foreground">Статистика</div>
                  <div className="text-xs text-muted-foreground">за 7 дней</div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "K/D", value: "1.00" },
                    { label: "Убийств", value: "0" },
                    { label: "В голову", value: "0" },
                    { label: "Смертей", value: "0" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-[11px] text-muted-foreground mb-0.5">{s.label}</div>
                      <div className="text-sm font-medium">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Об игроке */}
              <div className="bg-[hsl(0,0%,13%)] rounded-lg p-4">
                <div className="text-xs font-semibold text-foreground mb-3">Об игроке</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Играет на</div>
                    <div className="text-sm">{player.server}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">SteamID</div>
                    <div className="flex items-center gap-1.5 text-sm font-mono">
                      76561198324308990
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Icon name="Copy" size={11} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Впервые замечен</div>
                    <div className="text-sm">19.03.2026 в 00:21</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">IP адрес</div>
                    <div className="flex items-center gap-1.5 text-sm font-mono text-blue-400">
                      {player.ip}
                      <Icon name="ExternalLink" size={11} />
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Страна, город</div>
                    <div className="text-sm">{player.country.split(" ").slice(0, 2).join(" ")}, {player.city}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Провайдер</div>
                    <div className="text-sm">{player.isp}</div>
                  </div>
                </div>
              </div>

              {/* Steam */}
              <div className="bg-[hsl(0,0%,13%)] rounded-lg p-4">
                <div className="text-xs font-semibold text-foreground mb-3">Информация из Steam</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Приватность</div>
                    <div className="text-sm">Открыт частично</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Аккаунт создан</div>
                    <div className="text-sm">13.08.2016 в 08:09</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab !== "overview" && (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground animate-fade-in">
              <Icon name="Construction" size={28} className="mb-2 opacity-40" />
              <span className="text-sm">Раздел в разработке</span>
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded hover:bg-[hsl(0,0%,18%)] transition-colors text-muted-foreground hover:text-foreground z-10"
        >
          <Icon name="X" size={14} />
        </button>
      </div>
    </div>

    {actionDialog && (
      <ActionConfirmDialog
        type={actionDialog}
        player={player}
        onClose={() => setActionDialog(null)}
      />
    )}
    </>
  );
}

// ---- Section components ----

function PlayersSection() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base font-semibold tracking-tight">Игроки</h1>
        <SearchBar />
      </div>
      <table className="w-full">
        <thead><tr className="border-b border-[hsl(0,0%,13%)]">
          <TH>Игрок</TH><TH>IP адрес</TH><TH>Страна</TH><TH>Город</TH><TH>Провайдер</TH><TH>Сервер</TH>
        </tr></thead>
        <tbody>
          {MOCK_PLAYERS.map((p) => (
            <tr key={p.id} className="border-b border-[hsl(0,0%,11%)] hover:bg-[hsl(0,0%,10%)] transition-colors group">
              <td className="py-3 pr-8">
                <div className="flex items-center gap-2.5">
                  <div className="relative"><AvatarBadge name={p.name} /><span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[hsl(0,0%,9%)] ${p.status === "online" ? "bg-emerald-400" : "bg-[hsl(0,0%,28%)]"}`} /></div>
                  <div>
                    <button
                      onClick={() => setSelectedPlayer(p)}
                      className="text-sm font-medium hover:text-[hsl(28,100%,60%)] transition-colors cursor-pointer"
                    >
                      {p.name}
                    </button>
                    <div className="text-xs text-muted-foreground">{p.status === "online" ? "онлайн" : "офлайн"}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-8">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-mono">{p.ip}</span>
                  <Icon name="ExternalLink" size={11} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
              </td>
              <td className="py-3 pr-8 text-sm">{p.country}</td>
              <td className="py-3 pr-8 text-sm">{p.city}</td>
              <td className="py-3 pr-8 text-sm text-muted-foreground">{p.isp}</td>
              <td className="py-3 text-sm font-mono text-muted-foreground">{p.server}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPlayer && (
        <PlayerProfile player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  );
}

function ChatSection() {
  const [input, setInput] = useState("");
  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h1 className="text-base font-semibold tracking-tight">Чат</h1>
        <div className="flex items-center gap-1">
          {(["MessageSquare","Calendar","User"] as const).map((ic) => (
            <button key={ic} className="p-1.5 rounded hover:bg-[hsl(0,0%,13%)] transition-colors text-muted-foreground hover:text-foreground">
              <Icon name={ic} size={15} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 mb-3">
        <div className="flex justify-center my-4">
          <span className="text-xs text-muted-foreground bg-[hsl(0,0%,12%)] px-3 py-1 rounded-full">19 Мар</span>
        </div>
        {MOCK_CHAT.map((m) => (
          <div key={m.id} className="flex items-baseline gap-3 px-1 py-0.5 hover:bg-[hsl(0,0%,10%)] rounded group transition-colors">
            <span className="text-xs text-muted-foreground font-mono w-10 flex-shrink-0">{m.time}</span>
            <span className="text-xs font-semibold text-[hsl(28,100%,60%)]">{m.player}</span>
            <span className="text-sm">{m.message}</span>
            <span className="text-xs text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 font-mono">{m.server}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 bg-[hsl(0,0%,11%)] border border-[hsl(0,0%,15%)] rounded-lg px-3 py-2 flex-shrink-0">
        <AvatarBadge name="admin_root" />
        <input
          className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground outline-none"
          placeholder="Введите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base font-semibold tracking-tight">Репорты</h1>
        <SearchBar />
      </div>
      <table className="w-full">
        <thead><tr className="border-b border-[hsl(0,0%,13%)]">
          <TH>Дата</TH><TH>Репортящий</TH><TH>Подозреваемый</TH><TH>Контакты</TH><TH>Вердикт</TH><TH>Сервер</TH>
        </tr></thead>
        <tbody>
          {MOCK_REPORTS.map((r) => (
            <tr key={r.id} className="border-b border-[hsl(0,0%,11%)] hover:bg-[hsl(0,0%,10%)] transition-colors group">
              <td className="py-3 pr-8">
                <div className="text-sm">{r.date.split(" ")[0]}</div>
                <div className="text-xs text-muted-foreground font-mono">{r.date.split(" ")[1]}</div>
              </td>
              <td className="py-3 pr-8">
                <div className="flex items-center gap-2.5">
                  <AvatarBadge name={r.reporter} />
                  <div>
                    <div className="text-sm font-medium">{r.reporter}</div>
                    <div className="text-xs text-muted-foreground">@{r.reporter}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-8">
                <div className="flex items-center gap-2.5">
                  <AvatarBadge name={r.suspect} />
                  <div>
                    <div className="text-sm font-medium">{r.suspect}</div>
                    <div className="text-xs text-muted-foreground font-mono">{r.steamId}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-8">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span>{r.contacts}</span>
                  {r.contacts !== "—" && <Icon name="Copy" size={11} className="opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" />}
                </div>
              </td>
              <td className="py-3 pr-8"><Verdict v={r.verdict} /></td>
              <td className="py-3 text-sm font-mono text-muted-foreground">{r.server}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChecksSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base font-semibold tracking-tight">Проверки</h1>
        <div className="flex items-center gap-2">
          <SearchBar />
          <button className="p-1.5 rounded hover:bg-[hsl(0,0%,13%)] transition-colors text-muted-foreground">
            <Icon name="Settings" size={15} />
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead><tr className="border-b border-[hsl(0,0%,13%)]">
          <TH>Дата</TH><TH>Проверяющий</TH><TH>Подозреваемый</TH><TH>Контакты</TH><TH>Вердикт</TH>
        </tr></thead>
        <tbody>
          {MOCK_CHECKS.map((c) => (
            <tr key={c.id} className="border-b border-[hsl(0,0%,11%)] hover:bg-[hsl(0,0%,10%)] transition-colors group">
              <td className="py-3 pr-8">
                <div className="text-sm">{c.date.split(" ")[0]}</div>
                <div className="text-xs text-muted-foreground font-mono">{c.date.split(" ")[1]}</div>
              </td>
              <td className="py-3 pr-8">
                <div className="flex items-center gap-2.5">
                  <div className="relative"><AvatarBadge name={c.checker} /><span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[hsl(0,0%,9%)] bg-emerald-400" /></div>
                  <div>
                    <div className="text-sm font-medium">{c.checker}</div>
                    <div className="text-xs text-muted-foreground">{c.checkerTag}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-8">
                <div className="flex items-center gap-2.5">
                  <div className="relative"><AvatarBadge name={c.suspect} /><span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[hsl(0,0%,9%)] bg-emerald-400" /></div>
                  <div>
                    <div className="text-sm font-medium">{c.suspect}</div>
                    <div className="text-xs text-muted-foreground font-mono">{c.steamId}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-8">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span>{c.contacts}</span>
                  {c.contacts !== "—" && <Icon name="Copy" size={11} className="opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" />}
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <Verdict v={c.verdict} />
                  <Icon name="ExternalLink" size={11} className="text-muted-foreground opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base font-semibold tracking-tight">Оповещения</h1>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Отметить все как прочитанные</button>
      </div>
      <div className="space-y-1">
        {MOCK_NOTIFICATIONS.map((n) => (
          <div key={n.id} className="flex items-start gap-4 px-3 py-3 rounded-lg hover:bg-[hsl(0,0%,11%)] transition-colors">
            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${priorityDot[n.priority]}`} />
            <div className="flex-1">
              <p className="text-sm">{n.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono">{n.time}</p>
            </div>
            <span className="text-xs text-muted-foreground">{priorityLabel[n.priority]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BansSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base font-semibold tracking-tight">Блокировки</h1>
        <div className="flex items-center gap-2">
          <SearchBar />
          <button className="flex items-center gap-1.5 bg-[hsl(28,100%,55%)] text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[hsl(28,100%,50%)] transition-colors">
            <Icon name="Plus" size={13} />
            Добавить
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead><tr className="border-b border-[hsl(0,0%,13%)]">
          <TH>Игрок</TH><TH>Причина</TH><TH>Администратор</TH><TH>Дата</TH><TH>Истекает</TH><TH>Сервер</TH>
        </tr></thead>
        <tbody>
          {MOCK_BANS.map((b) => (
            <tr key={b.id} className="border-b border-[hsl(0,0%,11%)] hover:bg-[hsl(0,0%,10%)] transition-colors">
              <td className="py-3 pr-8">
                <div className="flex items-center gap-2.5">
                  <AvatarBadge name={b.player} />
                  <div>
                    <div className="text-sm font-medium">{b.player}</div>
                    <div className="text-xs text-muted-foreground font-mono">{b.steamId}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-8 text-sm">{b.reason}</td>
              <td className="py-3 pr-8">
                <div className="flex items-center gap-2"><AvatarBadge name={b.admin} /><span className="text-sm">{b.admin}</span></div>
              </td>
              <td className="py-3 pr-8 text-sm font-mono text-muted-foreground">{b.date}</td>
              <td className="py-3 pr-8">
                <span className={`text-sm font-mono ${b.expires === "Перм." ? "text-red-400" : "text-muted-foreground"}`}>{b.expires}</span>
              </td>
              <td className="py-3 text-sm font-mono text-muted-foreground">{b.server}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AuditSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base font-semibold tracking-tight">Журнал аудита</h1>
        <SearchBar />
      </div>
      <table className="w-full">
        <thead><tr className="border-b border-[hsl(0,0%,13%)]">
          <TH>Время</TH><TH>Администратор</TH><TH>Действие</TH><TH>Цель</TH><TH>Детали</TH>
        </tr></thead>
        <tbody>
          {MOCK_AUDIT.map((a) => (
            <tr key={a.id} className="border-b border-[hsl(0,0%,11%)] hover:bg-[hsl(0,0%,10%)] transition-colors">
              <td className="py-3 pr-8 text-sm font-mono text-muted-foreground">{a.time}</td>
              <td className="py-3 pr-8">
                <div className="flex items-center gap-2"><AvatarBadge name={a.admin} /><span className="text-sm">{a.admin}</span></div>
              </td>
              <td className="py-3 pr-8 text-sm">{a.action}</td>
              <td className="py-3 pr-8 text-sm font-medium text-[hsl(28,100%,60%)]">{a.target}</td>
              <td className="py-3 text-sm text-muted-foreground">{a.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ServersSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base font-semibold tracking-tight">Серверы</h1>
        <button className="flex items-center gap-1.5 bg-[hsl(28,100%,55%)] text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[hsl(28,100%,50%)] transition-colors">
          <Icon name="Plus" size={13} />
          Добавить сервер
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {MOCK_SERVERS.map((s) => (
          <div key={s.id} className="border border-[hsl(0,0%,14%)] rounded-lg p-4 hover:border-[hsl(0,0%,20%)] transition-colors bg-[hsl(0,0%,9%)]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold">{s.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${s.status === "online" ? "text-emerald-400 bg-emerald-950/40" : "text-muted-foreground bg-[hsl(0,0%,14%)]"}`}>
                    {s.status === "online" ? "онлайн" : "офлайн"}
                  </span>
                  <span className="text-xs text-muted-foreground bg-[hsl(0,0%,14%)] px-1.5 py-0.5 rounded">{s.region}</span>
                </div>
                <div className="text-xs text-muted-foreground font-mono">{s.ip}</div>
              </div>
              <button className="p-1 hover:bg-[hsl(0,0%,15%)] rounded transition-colors text-muted-foreground">
                <Icon name="MoreHorizontal" size={14} />
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div><div className="text-[11px] text-muted-foreground mb-0.5">Карта</div><div className="font-mono text-xs">{s.map}</div></div>
              <div><div className="text-[11px] text-muted-foreground mb-0.5">Игроки</div><div className="font-medium text-xs">{s.players}</div></div>
              <div><div className="text-[11px] text-muted-foreground mb-0.5">Пинг</div>
                <div className={`text-xs font-mono ${s.ping > 30 ? "text-yellow-400" : s.ping === 0 ? "text-muted-foreground" : "text-emerald-400"}`}>{s.ping > 0 ? `${s.ping}ms` : "—"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StaffSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base font-semibold tracking-tight">Сотрудники</h1>
        <button className="flex items-center gap-1.5 bg-[hsl(28,100%,55%)] text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[hsl(28,100%,50%)] transition-colors">
          <Icon name="Plus" size={13} />
          Добавить
        </button>
      </div>
      <table className="w-full">
        <thead><tr className="border-b border-[hsl(0,0%,13%)]">
          <TH>Сотрудник</TH><TH>Роль</TH><TH>В команде с</TH><TH>Действий</TH><TH>Статус</TH>
        </tr></thead>
        <tbody>
          {MOCK_STAFF.map((s) => (
            <tr key={s.id} className="border-b border-[hsl(0,0%,11%)] hover:bg-[hsl(0,0%,10%)] transition-colors">
              <td className="py-3 pr-8">
                <div className="flex items-center gap-2.5">
                  <div className="relative"><AvatarBadge name={s.name} /><span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[hsl(0,0%,9%)] ${s.status === "online" ? "bg-emerald-400" : "bg-[hsl(0,0%,28%)]"}`} /></div>
                  <span className="text-sm font-medium">{s.name}</span>
                </div>
              </td>
              <td className="py-3 pr-8">
                <span className="text-xs px-2 py-0.5 rounded bg-[hsl(28,100%,55%)]/10 text-[hsl(28,100%,65%)] font-medium">{s.role}</span>
              </td>
              <td className="py-3 pr-8 text-sm font-mono text-muted-foreground">{s.since}</td>
              <td className="py-3 pr-8 text-sm font-medium">{s.actions}</td>
              <td className="py-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <Dot status={s.status} />
                  <span className="text-muted-foreground">{s.status === "online" ? "онлайн" : "офлайн"}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---- Main layout ----

const SECTIONS: Record<string, React.ComponentType> = {
  players: PlayersSection,
  chat: ChatSection,
  reports: ReportsSection,
  checks: ChecksSection,
  notifications: NotificationsSection,
  bans: BansSection,
  audit: AuditSection,
  servers: ServersSection,
  staff: StaffSection,
};

export default function Index() {
  const [active, setActive] = useState("players");
  const projectName = "asdasdasd";
  const ActiveSection = SECTIONS[active];
  const isChat = active === "chat";

  return (
    <div className="flex h-screen bg-[hsl(0,0%,7%)] overflow-hidden select-none">
      {/* Sidebar */}
      <aside className="w-[196px] flex-shrink-0 bg-[hsl(0,0%,9%)] border-r border-[hsl(0,0%,13%)] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[hsl(0,0%,13%)]">
          <div className="w-6 h-6 rounded bg-[hsl(28,100%,55%)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {projectName[0].toUpperCase()}
          </div>
          <span className="text-sm font-medium truncate flex-1">{projectName}</span>
          <button className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <Icon name="LayoutGrid" size={13} />
          </button>
        </div>
        {/* Search */}
        <div className="px-2 py-2 border-b border-[hsl(0,0%,13%)]">
          <div className="flex items-center gap-2 bg-[hsl(0,0%,12%)] rounded px-2 py-1.5 cursor-text">
            <Icon name="Search" size={11} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground flex-1">Поиск...</span>
            <kbd className="text-[9px] text-muted-foreground border border-[hsl(0,0%,20%)] rounded px-1 font-mono">⌘F</kbd>
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-3">
          {NAV_SECTIONS.map((sec) => (
            <div key={sec.label}>
              <div className="text-[10px] font-semibold text-muted-foreground px-2 py-1 uppercase tracking-widest">{sec.label}</div>
              {sec.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors text-left mb-0.5 ${
                    active === item.id
                      ? "bg-[hsl(0,0%,15%)] text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-[hsl(0,0%,12%)]"
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={14}
                    className={active === item.id ? "text-[hsl(28,100%,55%)]" : ""}
                  />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        {/* Bottom */}
        <div className="border-t border-[hsl(0,0%,13%)] px-3 py-2 flex items-center gap-2.5">
          <button className="text-muted-foreground hover:text-foreground transition-colors"><Icon name="Flame" size={14} /></button>
          <button className="text-muted-foreground hover:text-foreground transition-colors"><Icon name="MessageSquare" size={14} /></button>
          <button className="text-muted-foreground hover:text-foreground transition-colors"><Icon name="Headphones" size={14} /></button>
          <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors"><Icon name="LogOut" size={14} /></button>
        </div>
      </aside>

      {/* Content */}
      <main className={`flex-1 overflow-hidden ${isChat ? "flex flex-col" : ""}`}>
        <div className={`${isChat ? "flex-1 flex flex-col p-6 min-h-0 overflow-hidden" : "p-6 overflow-auto h-full"}`}>
          {ActiveSection && <ActiveSection />}
        </div>
      </main>
    </div>
  );
}