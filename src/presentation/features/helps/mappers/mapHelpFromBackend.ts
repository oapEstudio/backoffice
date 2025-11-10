import type { IHelp } from "../../../../domain/entities/IHelp";

export const mapHelpFromBackend = (helpBackend: any): IHelp => {
     const { profile, ...rest } = helpBackend;
     return {
          ...rest,
          profiles: profile
     };
};