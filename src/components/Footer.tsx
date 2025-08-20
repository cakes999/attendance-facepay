const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-accent text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">FaceTrack Pro</h3>
            <p className="text-blue-100 leading-relaxed">
              Revolutionary face recognition attendance system with integrated payroll management for modern businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-blue-100">
              <li>AI Face Recognition</li>
              <li>Attendance Tracking</li>
              <li>Payroll Integration</li>
              <li>Analytics Dashboard</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Started</h4>
            <p className="text-blue-100 mb-4">
              Ready to transform your HR management? Contact us to set up your system.
            </p>
            <div className="text-sm text-blue-200">
              © 2024 FaceTrack Pro. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;