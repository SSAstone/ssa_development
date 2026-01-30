export default function AdminDashboard() {
    const stats = [
        { label: "Total Projects", value: "12", trend: "+2 this month", color: "text-blue-600" },
        { label: "Active Services", value: "8", trend: "0 change", color: "text-green-600" },
        { label: "Pending Notices", value: "3", trend: "-1 from last week", color: "text-orange-600" },
        { label: "Site Visitors", value: "1.2k", trend: "+15% vs last month", color: "text-purple-600" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome back, admin. Here's what's happening with @future today.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold">{stat.value}</span>
                            <span className={`text-xs font-medium ${stat.color}`}>{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-full lg:col-span-4 rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded bg-primary/10 flex items-center justify-center text-primary font-bold">P{i}</div>
                                    <div>
                                        <p className="font-medium text-sm">Project Omega-{i}</p>
                                        <p className="text-xs text-muted-foreground">Updated 2 hours ago</p>
                                    </div>
                                </div>
                                <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">Active</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-full lg:col-span-3 rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Schedule</h2>
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="border-l-4 border-primary pl-4 py-2">
                                <p className="font-medium text-sm italic">Meeting with Client A</p>
                                <p className="text-xs text-muted-foreground">Today at {10 + i}:00 AM</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}