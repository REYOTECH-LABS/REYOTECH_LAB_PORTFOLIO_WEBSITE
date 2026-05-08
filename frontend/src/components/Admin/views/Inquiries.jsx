import { CheckCircle, Trash2 } from 'lucide-react'
import { useInquiries, useMarkInquiryRead, useDeleteInquiry } from '../../../hooks/useInquiries'
import { cn } from '../../../lib/utils'

const Inquiries = () => {
  const { data: inquiries = [], isLoading } = useInquiries()
  const markRead = useMarkInquiryRead()
  const deleteInq = useDeleteInquiry()

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-xl font-black uppercase tracking-tight text-brand-dark mb-6">Client Inquiries</h2>
      {isLoading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" /></div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 text-brand-silver text-xs font-black uppercase tracking-widest">No inquiries yet.</div>
      ) : (
        <div className="bg-white rounded-[32px] border border-brand-dark/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-brand-light border-b border-brand-dark/5">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-brand-silver">Client</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-brand-silver">Subject</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-brand-silver">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-brand-silver text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark/5">
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id || inquiry.id} className="group hover:bg-brand-light/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-brand-dark uppercase">{inquiry.name}</span>
                      <span className="text-[10px] text-brand-silver">{inquiry.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs font-medium text-brand-dark">{inquiry.subject}</span></td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full',
                      inquiry.status === 'unread' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                    )}>{inquiry.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {inquiry.status === 'unread' && (
                        <button onClick={() => markRead.mutate(inquiry._id || inquiry.id)} className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"><CheckCircle size={16} /></button>
                      )}
                      <button onClick={() => deleteInq.mutate(inquiry._id || inquiry.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Inquiries
