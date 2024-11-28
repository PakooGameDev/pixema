type CaseType = 'uppercase' | 'lowercase' | 'capitalize';

export function transformString(input: string, caseType: CaseType): string {
  switch (caseType) {
    case 'uppercase':
      return input.toUpperCase();
    case 'lowercase':
      return input.toLowerCase();
    case 'capitalize':
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    default:
      return input; 
  }
}