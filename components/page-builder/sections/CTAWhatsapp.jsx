'use client';

export default function CTAWhatsapp({ 
  title, 
  description, 
  buttonText,
  message,
  phoneNumber
}) {
  const whatsappPhone = phoneNumber || '56988804299';
  const messageText = message || 'Hola, me gustaría conocer más sobre tus servicios.';
  
  const whatsappLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(messageText)}`;

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-2xl mx-auto text-center grid grid-cols-1 gap-6 justify-items-center">
        {/* WhatsApp Icon */}
        <div className="col-span-1 flex justify-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        </div>

        {/* Title */}
        {title && (
          <h2 className="col-span-1 text-3xl md:text-4xl font-display font-bold text-ink">
            {title}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p className="col-span-1 text-lg text-mid max-w-xl mx-auto">
            {description}
          </p>
        )}

        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-display font-semibold px-8 py-4 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.969 1.523A9.9 9.9 0 003.64 12.05c0 5.518 4.505 10.023 10.023 10.023 2.666 0 5.192-.999 7.148-2.820l.006.003a10.024 10.024 0 002.819-7.206c0-5.515-4.505-10.022-10.023-10.022z" />
          </svg>
          {buttonText || 'Conversar por WhatsApp'}
        </a>
      </div>
    </section>
  );
}
