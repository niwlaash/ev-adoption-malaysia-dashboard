import LegalLayout from '../layouts/LegalLayout';

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service">
      <h3>1. Terms</h3>
      <p>By accessing the EV Analytics dashboard, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
      
      <h3>2. Use License</h3>
      <p>Permission is granted to temporarily view the materials on EV Analytics' website for personal, non-commercial transitory viewing only.</p>
      
      <h3>3. Data Sources</h3>
      <p>The data displayed on this dashboard is sourced from the Department of Statistics Malaysia (DOSM) Open Data platform. While we strive for accuracy, we make no guarantees regarding the timeliness or completeness of the data provided by external sources.</p>
      
      <h3>4. Limitations</h3>
      <p>In no event shall EV Analytics or its suppliers be liable for any damages arising out of the use or inability to use the materials on the dashboard.</p>
      
      <h3>5. Governing Law</h3>
      <p>These terms and conditions are governed by and construed in accordance with the laws of Malaysia.</p>
    </LegalLayout>
  );
}
