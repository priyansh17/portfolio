import dellSummer from '../media/certificates/Priyansh Choudhary _Dell Internship.pdf';
import dellWinter from '../media/certificates/Dell Summer Internship Completion Certificate.pdf';
import highRadius from '../media/certificates/1805589_Priyansh Choudhary_Certificate_HighRadius.pdf';
import kpmg from '../media/certificates/KPMG Certificate.pdf';
import java from '../media/certificates/Core Java Training - Certificate of Completion.pdf';
import android from '../media/certificates/Android App Development Training - Certificate of Completion.pdf';
import programming from '../media/certificates/Programming with C and C++ Training - Certificate of Completion.pdf';
import web from '../media/certificates/Web Development Training - Certificate of Completion.pdf';
import agile from '../media/certificates/Dell mandatory trainings/CertificateOfCompletion_Agile Foundations.pdf';
import communication from '../media/certificates/Dell mandatory trainings/CertificateOfCompletion_Communication Foundations.pdf';
import time from '../media/certificates/Dell mandatory trainings/CertificateOfCompletion_Time Management Working from Home.pdf';
import b2b from '../media/certificates/1805589_Priyansh Choudhary_HighRadius_Scores.pdf';
import diary from '../media/certificates/PIC EVALUATION.png';
import androidProject from '../media/certificates/Android App Development Training - Certificate of Excellence.pdf';

export default [
  { group: 'Internships', items: [{ name: 'Dell Technologies (Summer)', url: dellSummer }, { name: 'Dell Technologies (Winter)', url: dellWinter }, { name: 'HighRadius Technologies', url: highRadius }, { name: 'KPMG', url: kpmg }] },
  { group: 'Training', items: [{ name: 'Core JAVA', url: java }, { name: 'Android Development', url: android }, { name: 'C & C++', url: programming }, { name: 'Web Development', url: web }, { name: 'Agile Foundations', url: agile }, { name: 'Communications Foundations', url: communication }, { name: 'Time Management Foundations', url: time }] },
  { group: 'Projects & competitions', items: [{ name: 'B2B Full Stack Website', url: b2b }, { name: 'Dear Diary: PIC 2020', url: diary }, { name: 'Android Full Stack Development', url: androidProject }] },
];
