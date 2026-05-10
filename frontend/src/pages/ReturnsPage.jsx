import { FiRefreshCw, FiCheckCircle, FiClock, FiShield } from 'react-icons/fi';

const ReturnsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 page-enter">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-400">
          <FiRefreshCw size={40} />
        </div>
        <h1 className="text-4xl font-display font-bold text-white mb-4">Returns & <span className="gradient-text">Refunds</span></h1>
        <p className="text-white/50 text-lg">Hassle-free returns within 30 days of purchase.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: FiClock, title: '30 Days', desc: 'Return any item within 30 days of delivery' },
          { icon: FiShield, title: 'Original State', desc: 'Items must be unused and in original packaging' },
          { icon: FiCheckCircle, title: 'Fast Refunds', desc: 'Refunds processed within 3-5 business days' }
        ].map((item, i) => (
          <div key={i} className="glass-card p-6 border border-white/5 text-center hover:border-pink-500/20 transition-all">
            <item.icon className="mx-auto text-pink-400 mb-4" size={32} />
            <h3 className="text-white font-bold mb-2">{item.title}</h3>
            <p className="text-white/40 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 border border-white/5">
        <h2 className="text-2xl font-bold text-white mb-6">How to Return an Item</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h4 className="text-white font-bold mb-1">Initiate Return</h4>
              <p className="text-white/50 text-sm leading-relaxed">Log into your account, go to your Orders, and select the item you wish to return. Fill out the quick return form.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h4 className="text-white font-bold mb-1">Pack Your Items</h4>
              <p className="text-white/50 text-sm leading-relaxed">Pack the items securely in their original packaging. Print the provided return shipping label and attach it outside.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h4 className="text-white font-bold mb-1">Drop Off</h4>
              <p className="text-white/50 text-sm leading-relaxed">Drop off the package at any partnered courier location. You will receive an email once we receive it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
