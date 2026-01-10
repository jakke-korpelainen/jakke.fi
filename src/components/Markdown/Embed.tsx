const classes = {
  youtube: {
    wrapper: `
      overflow-hidden
      pb-[56.25%]
      relative
      h-0
      [&>iframe]:absolute
      [&>iframe]:top-0
      [&>iframe]:left-0
      [&>iframe]:w-full
      [&>iframe]:h-full
      md:overflow-auto
      md:pb-0
      md:static
      md:h-auto
      md:[&>iframe]:w-[560px]
      md:[&>iframe]:h-[315px]
      md:[&>iframe]:static
      md:[&>iframe]:top-auto
      md:[&>iframe]:left-auto
      `,
  },
};

export function Embed({ children }: { children: string }) {
  const hasYoutubePlayer =
    children.includes("youtube") || children.includes("YouTube video player");

  // if embedded content can be considered to be a youtube player
  if (hasYoutubePlayer) {
    return (
      <div
        className={classes.youtube.wrapper}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: suppress
        dangerouslySetInnerHTML={{ __html: children }}
      />
    );
  }

  // biome-ignore lint/security/noDangerouslySetInnerHtml: suppress
  return <div dangerouslySetInnerHTML={{ __html: children }} />;
}
