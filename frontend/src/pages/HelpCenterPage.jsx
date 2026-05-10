import { Link } from 'react-router-dom';
import { FiLifeBuoy, FiMessageCircle, FiBookOpen } from 'react-icons/fi';

const HelpCenterPage = () => {
  const faqs = [
    { q: 'How do I track my order?', a: 'You can track your order status in the "Track Order" page using your order ID.' },
    { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee for all unused items in original packaging.' },
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express options are available at checkout.' },
    { q: 'Do you ship internationally?', a: 'Yes! We ship to over 100 countries worldwide.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 page-enter">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-white mb-4">How can we <span className="gradient-text">help you?</span></h1>
        <p className="text-white/50 text-lg">Search our knowledge base or get in touch.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: FiBookOpen, title: 'Guides', desc: 'Step-by-step tutorials' },
          { icon: FiLifeBuoy, title: 'Support', desc: 'Get human assistance' },
          { icon: FiMessageCircle, title: 'Community', desc: 'Connect with others' }
        ].map((item, i) => (
          <div key={i} className="glass-card p-6 border border-white/5 text-center hover:border-purple-500/30 transition-all">
            <item.icon className="mx-auto text-purple-400 mb-4" size={32} />
            <h3 className="text-white font-bold mb-2">{item.title}</h3>
            <p className="text-white/40 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-card p-6 border border-white/5">
            <h3 className="text-lg font-bold text-white/90 mb-2">{faq.q}</h3>
            <p className="text-white/50 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenterPage;
