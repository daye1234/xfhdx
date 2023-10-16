/*
 * Created: 2020-08-03 15:28:26
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: svg的声明
 */

type SvgrComponent = React.StatelessComponent<React.SVGAttributes<SVGAElement>>;

declare module '*.svg' {
  const content: SvgrComponent;
  export = content;
}
