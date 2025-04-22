export const parseContent = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
  
    const sections = {
      introParagraph: '',
      developerHeading: '',
      tabs: [],
      workProcess: [],
      awards: [],
      sectionTitles: []
    };
  
    // 1. Intro paragraph (first <p> before any major section)
    const firstP = doc.querySelector('p');
    if (firstP) {
      sections.introParagraph = firstP.outerHTML;
    }
  
    // 2. Developer heading (first <h2>)
    const firstH2 = doc.querySelector('h2');
    if (firstH2) {
      sections.developerHeading = firstH2.textContent.trim();
    }
    // 3. Extract Titles and Content (Work Process, Awards, etc.)
    const sectionTitles = Array.from(doc.querySelectorAll('.wp-block-heading')).map(h2 => h2.textContent.trim());
    sections.sectionTitles = sectionTitles;
   // 3. Tabs (based on <h3>)
   const h3Elements = Array.from(doc.querySelectorAll('h3')).filter(h => h.textContent.trim());
   sections.tabs = h3Elements.map((h3, index) => {
     const container = document.createElement('div');
     let next = h3.nextElementSibling;
 
     while (next && next.tagName !== 'H3') {
       // Check for the specific tab content you want
       // Only include the tab content until the specific point
       if (next.textContent.includes('Hours') || next.textContent.includes('Time to Hire')) {
         container.appendChild(next.cloneNode(true));
       }
       next = next.nextElementSibling;
     }
 
     return {
       title: h3.textContent.trim(),
       content: container.innerHTML
     };
   });
  
    // 4. Work Process (based on <ol> and <p> with <strong>)
    const workProcessSteps = [];
    const strongs = doc.querySelectorAll('ol strong, p strong');
    strongs.forEach((strong, index) => {
      const parent = strong.closest('li, p');
      if (parent) {
        const description = parent.textContent.replace(strong.textContent, '').trim();
        workProcessSteps.push({
          number: String(index + 1).padStart(2, '0'),
          title: strong.textContent.trim(),
          description
        });
      }
    });
    sections.workProcess = workProcessSteps;
  
    // 5. Awards (from <p> with <br>)
    const awardParagraphs = Array.from(doc.querySelectorAll('p')).reverse();
    for (const p of awardParagraphs) {
      if (p.innerHTML.includes('<br>') && p.textContent.includes('Developer')) {
        const lines = p.innerHTML.split('<br>');
        sections.awards = lines.map((line, index) => {
          const cleanText = line.replace(/&nbsp;/g, ' ').trim();
          const [year, ...rest] = cleanText.split('–');
          return {
            number: String(index + 1).padStart(2, '0'),
            year: year.trim(),
            title: rest.join('–').trim()
          };
        });
        break;
      }
    }
  
    return sections;
  };
  