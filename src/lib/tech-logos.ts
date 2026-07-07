export type TechLogo = {
  src: string;
  alt: string;
};

// Ordered by match specificity — earlier entries are checked first so a tag
// like "SQL Server Data Tools (SSDT)" resolves to SQL Server, not something broader.
const registry: { match: string; logo: TechLogo }[] = [
  { match: 'Power BI', logo: { src: '/logos/power-bi.svg', alt: 'Power BI' } },
  { match: 'SQL Server', logo: { src: '/logos/sql-server.svg', alt: 'Microsoft SQL Server' } },
  { match: 'SSDT', logo: { src: '/logos/sql-server.svg', alt: 'Microsoft SQL Server' } },
  { match: 'Microsoft Fabric', logo: { src: '/logos/fabric.svg', alt: 'Microsoft Fabric' } },
  { match: 'OneLake', logo: { src: '/logos/fabric.svg', alt: 'Microsoft Fabric' } },
  { match: 'Azure Data Explorer', logo: { src: '/logos/azure-data-explorer.svg', alt: 'Azure Data Explorer' } },
  { match: 'Azure', logo: { src: '/logos/azure.svg', alt: 'Microsoft Azure' } },
  { match: 'SAP', logo: { src: '/logos/sap.svg', alt: 'SAP' } },
  { match: 'Salesforce', logo: { src: '/logos/salesforce.svg', alt: 'Salesforce' } },
  { match: 'GraphQL', logo: { src: '/logos/graphql.svg', alt: 'GraphQL' } },
  { match: 'Spark', logo: { src: '/logos/apache-spark.svg', alt: 'Apache Spark' } },
  { match: 'Python', logo: { src: '/logos/python.svg', alt: 'Python' } },
  { match: 'C#', logo: { src: '/logos/csharp.svg', alt: 'C#' } },
  { match: 'PowerShell', logo: { src: '/logos/powershell.svg', alt: 'PowerShell' } },
  { match: 'Git', logo: { src: '/logos/git.svg', alt: 'Git' } },
  { match: 'Docker', logo: { src: '/logos/docker.svg', alt: 'Docker' } },
];

/**
 * Returns up to `max` distinct logos matched from techStack, in tag array
 * order. Matching is substring-based since tags like "Azure Synapse Analytics"
 * or "Power BI Premium" don't exactly equal a registry key. Dedupes by logo
 * (e.g. "Azure Data Factory" and "Azure Functions" both resolve to the same
 * Azure logo and only count once).
 */
export function findLogos(techStack: string[], max = 3): TechLogo[] {
  const found: TechLogo[] = [];
  const seenSrc = new Set<string>();

  for (const tag of techStack) {
    if (found.length >= max) break;
    const entry = registry.find((r) => tag.includes(r.match));
    if (entry && !seenSrc.has(entry.logo.src)) {
      seenSrc.add(entry.logo.src);
      found.push(entry.logo);
    }
  }

  return found;
}
