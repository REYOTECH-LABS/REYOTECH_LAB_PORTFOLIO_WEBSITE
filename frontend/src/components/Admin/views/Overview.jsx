import { Filter, Briefcase, MessageSquare, ArrowUpRight, Box, DollarSign, TrendingUp, TrendingDown, Clock, Search, MoreHorizontal } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { useProjects } from '../../../hooks/useProjects'
import { useInquiries } from '../../../hooks/useInquiries'
import { useServiceCategories } from '../../../hooks/useServices'

const Overview = () => {
  const { data: services = [] } = useServiceCategories()
  const { data: projects = [] } = useProjects()
  const { data: inquiries = [] } = useInquiries()

  const stats = [
    { label: 'Total Services', count: services.length, icon: Box, color: 'text-[#4b6bfb]', bg: 'bg-[#eef0ff]' },
    { label: 'Active Projects', count: projects.length, icon: Briefcase, color: 'text-[#8b5cf6]', bg: 'bg-[#f3e8ff]' },
    { label: 'Total Inquiries', count: inquiries.length, icon: TrendingUp, color: 'text-[#10b981]', bg: 'bg-[#d1fae5]' },
    { label: 'New Messages', count: inquiries.filter(i => i.status === 'unread').length, icon: MessageSquare, color: 'text-[#ef4444]', bg: 'bg-[#fee2e2]' },
  ]

  return (
    <div className="animate-in fade-in duration-500">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[20px] p-6 flex flex-col justify-center border border-gray-50 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon size={22} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-[#1a1c23] leading-none">{stat.count.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Inquiries List */}
        <div className="bg-white rounded-[24px] border border-gray-50 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="text-gray-400" size={20} />
              <h2 className="text-lg font-bold text-[#1a1c23]">Recent Activity</h2>
            </div>
            <button className="px-4 py-1.5 bg-gray-50 text-gray-600 text-xs font-bold rounded-full hover:bg-gray-100 transition-colors">
              See All
            </button>
          </div>

          <div className="space-y-4">
            {inquiries.slice(0, 4).map((inquiry, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f4f6ff] text-[#4b6bfb] flex items-center justify-center">
                    <span className="font-bold text-sm">{inquiry.name?.charAt(0).toUpperCase() || 'U'}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1a1c23]">{inquiry.name || 'New Inquiry'}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{new Date(inquiry.createdAt || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#f4f6ff] text-[#4b6bfb] text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {inquiry.service || 'General'}
                </div>
              </div>
            ))}
            {inquiries.length === 0 && (
              <div className="text-center py-8 text-sm text-gray-400 font-medium">No recent inquiries found.</div>
            )}
          </div>
        </div>

        {/* Top Projects List */}
        <div className="bg-white rounded-[24px] border border-gray-50 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Box className="text-gray-400" size={20} />
              <h2 className="text-lg font-bold text-[#1a1c23]">Top Projects</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter size={14} /> Sort
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-semibold text-gray-400 border-b border-gray-100">
                  <th className="pb-3 font-medium">Project</th>
                  <th className="pb-3 font-medium text-center">Category</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 5).map((project, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        {project.images?.[0] ? (
                          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <Briefcase className="w-4 h-4 m-2 text-gray-400" />
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#1a1c23]">{project.title}</span>
                    </td>
                    <td className="py-4 text-sm text-gray-500 font-medium text-center">{project.category}</td>
                    <td className="py-4 text-right">
                      <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded">Active</span>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-sm text-gray-400 font-medium">No projects available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Overview
