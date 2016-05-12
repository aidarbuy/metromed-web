import React       from 'react';
import Helmet      from 'react-helmet';
import dataDoctors from "../data/doctors";
import DoctorCard  from '../components/cards/DoctorCard';

export default () => (
  <section>
    <Helmet title="Doctors - Metromed UC"/>

    <h3>Doctors</h3>

    <div className="flex-container">
      {dataDoctors.map((doc, i) => (
        <div key={doc.id} className="flex-item">
          <DoctorCard doc={doc} />
        </div>
      ))}
    </div>
  </section>
);