import Link from "next/link";
import { faqTopics, type FaqTopic } from "../data/buyer-faqs";

export function BuyerFaqLink({ topic = "ordering" }: { topic?: FaqTopic }) {
  const selected = faqTopics.find((item) => item.id === topic)!;
  return <section className="shell buyer-faq-link"><div><p className="eyebrow">More buyer questions</p><h2>{selected.title}</h2><p>{selected.description}</p></div><Link className="button button-ghost" href={`/buyer-faq/#${topic}`}>Read the buyer FAQ →</Link></section>;
}
